import React, { useRef, useState, forwardRef, useEffect, useCallback } from 'react';
import { find, forEach } from 'lodash';
import classNames from 'classnames';
import warning from 'warning';

import styles from './Image.module.scss';

// --------------------------------------------------------------------------------------------
// Steps in rendering Image
//
// 1. Picture is rendered without src, srcSets, and with a padding-top placholder on the <img>
// based on the containerAspectRatio.
// 2. The "sizes" attr is calculated on initial render to determine width of image.
// 3. When lazyload is triggered the src and scrSet props are populated based on the sizes value.
// 4. The image is set to opacity:0 to start to prevent flash of alt text
// 5. The image onLoad and onError events remove padding-top placholder and sets opacity to 1.
// --------------------------------------------------------------------------------------------

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

function scrollparent(element: Element): Element {
  let style = getComputedStyle(element);
  const excludeStaticParent = style.position === 'absolute';
  const overflowRegex = /(auto|scroll)/;

  if (style.position === 'fixed') return document.body;

  // eslint-disable-next-line no-cond-assign
  for (let parent: Element | null = element; (parent = parent.parentElement); ) {
    style = getComputedStyle(parent);
    if (excludeStaticParent && style.position === 'static') {
      // eslint-disable-next-line no-continue
      continue;
    }
    if (overflowRegex.test(style.overflow + style.overflowY + style.overflowX)) return parent;
  }

  return document.body;
}

function getIntersectionObserverRoot(target: Element): Element | null {
  const parent = scrollparent(target);
  return parent && (parent.tagName === 'HTML' || parent.tagName === 'BODY') ? null : parent;
}

function useLazyLoad(
  el: Element | null,
  browserSupportIntersectionObserver: boolean,
): boolean {
  // The total number of Intersection Observers that we end up creating. We create one for each
  // scrollable parent element of `el`. An image within a carousel, for example, could have two
  // scrollable parents: the carousel and the `<body>` element. We'd load the image if it is
  // visible within the carousel and the carousel is visible within the body.
  const [numObservers, setNumObservers] = useState<number>(0);
  // The number of Intersection Observers we've created that have intersected.
  const [numHaveIntersected, setNumHaveIntersected] = useState<number>(0);
  // We store the Intersection Observer instances so that we can clean them up in the `useEffect`
  // return function.
  const observers = useRef<IntersectionObserver[]>([]);

  useEffect(() => {
    if (el && browserSupportIntersectionObserver) {
      // Get array of targets and roots to use with Intersection Observer. `target` is the
      // child element and `root` is the scrollable parent. This terminology comes from the
      // Insersection Observer itself:
      // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      const observersToCreate: { target: Element; root: Element | null }[] = [];

      // The first target is always the element passed in.
      let target = el;
      let root = getIntersectionObserverRoot(target);

      observersToCreate.push({ target, root });

      // If `root !== null`, that means that there is another scrollable parent. Continue
      // traversing up the DOM tree until we get to the top.
      while (root !== null) {
        target = root;
        root = getIntersectionObserverRoot(target);
        observersToCreate.push({ target, root });
      }

      // We later use the total number of observers to determine if they are all visible.
      setNumObservers(observersToCreate.length);

      // Take the array of targets and roots and create a bunch of Intersection Observers.
      observers.current = observersToCreate.map(p => {
        // We disable this line since we polyfill `IntersectionObserver`.
        // eslint-disable-next-line compat/compat
        const observer = new IntersectionObserver(
          entries => {
            // We can assume it's the first one since we only observe one target per
            // IntersectionObserver.
            const entry = entries[0];

            // We use both `isIntersecting` and `intersectionRatio` because Edge 15
            // doesn't support `isIntersecting`.
            if (entry.isIntersecting || entry.intersectionRatio > 0) {
              // We need to pass in a function to `setNumHaveIntersected` so that it
              // can get the current value of `numHaveIntersected` within this
              // callback.
              setNumHaveIntersected(n => n + 1);
              // We turn off the observer once it has intersected. This is a purposely
              // naïve approach even though it introduces a small bug: images within
              // an auto-advancing carousel that once were `isIntersecting`
              // within the carousel but been auto-advanced out of view will get
              // loaded once the user scrolls and the carousel intersects the
              // `<body>`. To fix this, we'd have to increment and decrement
              // `observer.current`'s and then turn them all off once the image should
              // be loaded. This would add lot of complexity for an uncommon case so
              // we leave it as is.
              observer.unobserve(entry.target);
            }
          }, {
            root: p.root,
            rootMargin: '100px',
          },
        );

        observer.observe(p.target);

        return observer;
      });
    }

    return function cleanObservers(): void {
      forEach(observers.current, (o: any) => o.disconnect());
    };
  }, [el, browserSupportIntersectionObserver]);

  // The image should load if there's at least one Intersection Observer set up and all of them
  // have intersected. The `> 0` check prevents the hook from returning true while before it has
  // even initialized.
  return numObservers > 0 && numObservers === numHaveIntersected;
}

type ImageSource = {
  type: 'image/webp' | 'image/jpeg' | 'image/png' | 'image/gif',
  srcSet: string
};

interface ImagePropsTypes {
  src: string,
  sources?: ImageSource[],
  alt: string,
  height?: string,
  containerAspectRatio?: number,
  forceEarlyRender?: React.ImgHTMLAttributes<HTMLImageElement>['sizes'],
  objectFit?: 'cover' | 'contain',
  objectPosition?: 'top' | 'center' | 'bottom' | 'left' | 'right',
  className?: string,
  style?: {
    [key: string]: any
  }
}

type ObjectFitPropsType = {
  style?: {
    // Not using React.CSSProperties types for these two, because we use a restricted subset.
    objectFit?: 'cover' | 'contain',
    objectPosition?: 'top' | 'center' | 'bottom' | 'left' | 'right',
    fontFamily?: React.CSSProperties['fontFamily'],
    height?: '100%'
  };
};

type AspectRatioBoxPropsType = {
  style?: {
    paddingTop?: React.CSSProperties['paddingTop'],
    overflow?: React.CSSProperties['overflow'],
    height?: React.CSSProperties['height']
  };
};

const Image = forwardRef<HTMLElement, ImagePropsTypes>((props: ImagePropsTypes, outerRef) => {
  const {
    src,
    sources = [],
    height,
    containerAspectRatio,
    objectFit = 'cover',
    objectPosition = 'center',
    alt = '',
    className,
    forceEarlyRender = null,
    style
  } = props;

  // The outermost DOM node that this component references. We use `useState` instead of
  // `useRef` because callback refs allow us to add more than one `ref` to a DOM node.
  const [containerRef, setContainerRef] = useState<Element | null>(null);

  // --------------------------------------------------------------------------------------------
  // Sizes
  // --------------------------------------------------------------------------------------------

  // Used by srcSet to determine which image in the list will be requested. This value has to be
  // calculated client-side because we don't know the viewport width.

  const computeSizes = (): string =>
    containerRef && containerRef.clientWidth ? `${containerRef.clientWidth}px` : '0px';

  // If `forceEarlyRender` is truthy use that value, otherwise use the computed width.
  const sizes = forceEarlyRender || computeSizes();

  // --------------------------------------------------------------------------------------------
  // Lazy-loading: library setup and polyfill
  // --------------------------------------------------------------------------------------------

  const [browserSupportIntersectionObserver, setBrowserSupportIntersectionObserver] = useState<
    boolean
  >(canUseDOM && typeof window.IntersectionObserver !== 'undefined');

  const shouldLoad = useLazyLoad(containerRef, browserSupportIntersectionObserver);

  // Loads the `IntersectionObserver` polyfill asynchronously on browsers that don't support it.
  if (canUseDOM && typeof window.IntersectionObserver === 'undefined') {
    import('intersection-observer').then(() => {
      setBrowserSupportIntersectionObserver(true);
    });
  }

  // If `forceEarlyRender` is truthy, bypass lazy loading and load the image.
  const shouldLoadImage = shouldLoad || forceEarlyRender;

  // --------------------------------------------------------------------------------------------
  // Object Fit: polyfill and CSS styles
  // --------------------------------------------------------------------------------------------

  const objectFitProps: ObjectFitPropsType = {};

  // Checking for the use of the `height` prop is not enough since users can also change the
  // image height using `className`, or `style`.
  const shouldObjectFit = !!height || !!props.objectFit;

  const shouldPolyfillObjectFit =
    canUseDOM &&
    document.documentElement &&
    document.documentElement.style &&
    'objectFit' in document.documentElement.style !== true;

  warning(
    (!height && !containerAspectRatio) ||
      (height && !containerAspectRatio) ||
      (!height && containerAspectRatio),
    'You can pass either a `height` or `containerAspectRatio` to the `Image` component, but not both.',
  );

  useEffect(() => {
    // We polyfill `object-fit` for browsers that don't support it. We only do it if we're
    // using a `height` or `containerAspectRatio`. The `shouldLoadImage` variable ensures
    // that we don't try to polyfill the image before the `src` exists. This can happy
    // when we lazy-load.
    if (shouldObjectFit && containerRef && shouldLoadImage && shouldPolyfillObjectFit) {
      import('object-fit-images').then(({ default: ObjectFitImages }) => {
        ObjectFitImages(containerRef.querySelector('img'));
      });
    }
  }, [shouldObjectFit, containerRef, shouldLoadImage, shouldPolyfillObjectFit]);

  if (shouldObjectFit) {
    objectFitProps.style = {
      objectFit,
      objectPosition,
    };

    if (!height) {
      // Add `height: 100%` as an inline style if the user wants to `objectFit` but hasn't
      // passed in the `height` prop. Almost always, this means that the user is setting the
      // height with CSS or an inline style. Since inline styles and `className` get added to
      // `picture`, not `img`, the `img` element would become taller than the picture,
      // preventing the `objectFit` from working. Adding `height: 100%` to the `img` in these
      // cases allows `objectFit` to work as well as it would if the `height` was provided as
      // a prop rather than through `style` or `className`.
      objectFitProps.style.height = '100%';
    }

    if (shouldPolyfillObjectFit) {
      // Weird, but this is how the polyfill knows what to do with the image in IE.
      objectFitProps.style.fontFamily = `"object-fit: ${objectFit}; object-position: ${objectPosition}"`;
    }
  }

  // --------------------------------------------------------------------------------------------
  // Image Aspect Ratio used for image placeholder
  // --------------------------------------------------------------------------------------------

  const aspectRatioBoxProps: AspectRatioBoxPropsType = {};

  if (containerAspectRatio) {
    // This ensures that lazy-loaded images don't cause the browser scroll to jump once the
    // image has loaded. It uses the following technique:
    // https://css-tricks.com/aspect-ratio-boxes/
    const h = 100000;
    const w = h * containerAspectRatio;

    aspectRatioBoxProps.style = {
      paddingTop: `${(h / w) * 100}%`,
      overflow: 'hidden', // Prevents alt text from taking up space before `src` is populated
      height: 0,
    };
  }

  // --------------------------------------------------------------------------------------------
  // Sources and srcSets
  // --------------------------------------------------------------------------------------------

  // We separate `webp` from the `jpeg`/`png` so that we can apply the `imgTagSource` directly
  // onto the `img` tag. While this makes the code messier, it is needed to work around a bug in
  // Safari:
  // - https://bugs.webkit.org/show_bug.cgi?id=190031
  // - https://bugs.webkit.org/show_bug.cgi?id=177068

  const webpSource = find(sources, (s: any) => s.type === 'image/webp');
  const imgTagSource = find(sources, (s: any) => s.type === 'image/jpeg' || s.type === 'image/png');

  // --------------------------------------------------------------------------------------------
  // Image load and error states
  // --------------------------------------------------------------------------------------------

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  // --------------------------------------------------------------------------------------------
  // Combining refs: This component has three refs that need to be combined into one. This
  // method of combining refs is suggested by `react-intersection-observer`:
  // https://github.com/thebuilder/react-intersection-observer#how-can-i-assign-multiple-refs-to-a-component
  // --------------------------------------------------------------------------------------------

  const setRefs = useCallback(
    node => {
      // Using a callback `ref` on this `picture` allows us to have multiple `ref`s on one
      // element.
      setContainerRef(node);

      // Check if the consumer sets a ref.
      if (typeof outerRef === 'function') {
        outerRef(node);
      }
    },
    [outerRef, setContainerRef],
  );

  return (
    <>
      <picture className={classNames(styles.picture, className)} ref={setRefs} style={style}>
        {webpSource && (
          <source
            type={webpSource.type}
            // Only add this attribute if lazyload has been triggered.
            srcSet={shouldLoadImage ? webpSource.srcSet : undefined}
            sizes={sizes}
          />
        )}
        <img
          // The order of `sizes`, `srcSet`, and `src` is important to work around a bug in
          // Safari. Once the bug is fixed, we should simplify this by using `src` on the
          // `img` tag and using `source` tags.
          sizes={sizes}
          // Only add this attribute if lazyload has been triggered.
          srcSet={shouldLoadImage && imgTagSource ? imgTagSource.srcSet : undefined}
          // Only add this attribute if lazyload has been triggered.
          src={shouldLoadImage ? src : undefined}
          // Height is generally only used for full-width hero images.
          height={height}
          alt={alt}
          // Adds object fit values if specified and adds/removes placeholder padding.
          // For SSR we want this to fire instantly.
          style={{
            ...(shouldObjectFit ? objectFitProps.style : {}),
            ...(isLoaded || isError || forceEarlyRender
              ? {}
              : aspectRatioBoxProps.style),
          }}
          onLoad={(): void => {
            setIsLoaded(true);
          }}
          onError={(): void => {
            setIsError(true);
          }}
          className={classNames({
            [styles.image]: true,
            // Opacity to 0, prevents flash of alt text when `height` prop used
            [styles.imageStart]: true,
            // Opacity to 1 to reveal image or show alt text on error
            // For SSR we want this to fire instantly.
            [styles.imageEnd]: isLoaded || isError || forceEarlyRender,
          })}
        />
      </picture>
      {!forceEarlyRender && (
        <noscript>
          <img src={src} alt={alt} />
        </noscript>
      )}
    </>
  );
});

// Needed because of the `forwardRef`.
Image.displayName = 'Image';

export default Image;

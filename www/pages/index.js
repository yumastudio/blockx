import { useState } from "react"
import {
  CheckIcon,
  WarningOutlineIcon,
  WarningFillIcon,
  InfoOutlineIcon,
  InfoFillIcon,
  CrossIcon
} from '@yumastudio/blockx-icons'
import {
  Title,
  Text,
  Button,
  TextInput,
  TextArea,
  Select,
  Radio,
  Checkbox,
  StarRating,
  BannerAlert,
  Alert,
  Image,
  UserAvatar,
  EntityAvatar,
  FilterChip,
  ToggleChip,
  Modal,
  Tooltip
} from "@yumastudio/blockx-react/dist/es/src/index"
import colors from "@yumastudio/blockx-scss/config/colors.json"

const Card = ({ children, title }) => (
  <div className="max-w-6 rounded-big mx-auto bg-white shadow-1 p-5 mb-5">
    <Title heading={2} size={2} className="mb-5">{ title }</Title>
    { children }
  </div>
)

const Section = ({ children, title }) => (
  <div className="mb-5">
    <Title heading={2} size={3} className="mb-3">{ title }</Title>
    { children }
  </div>
)

const SubSection = ({ children, title }) => (
  <div className="my-3">
    <Title heading={2} size={4} className="mb-2">{ title }</Title>
    { children }
  </div>
)

const ColorCard = ({ hex, name }) => (
  <div className="border rounded overflow-hidden mr-3" style={{ width: "130px" }}>
    <div className="mx-auto" style={{ backgroundColor: hex, height: "130px" }}></div>
    <Text className="border-t  py-2 text-center" size={3}> { name }</Text>
  </div>
)

export default function Home() {
  const [textInput, setTextInput] = useState("")
  const [smallWidthModalIsOpen, setSmallWidthModalIsOpen] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [largeWidthModalIsOpen, setLargeWidthModalIsOpen] = useState(false)
  const [mediumHeightModalIsOpen, setMediumHeightModalIsOpen] = useState(false)
  const [largeHeightModalIsOpen, setLargeHeightModalIsOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-200 pb-5 pt-6">
      <div className="wrap">
        <Title className="text-center mb-6" heading={1}>McQueen Playground</Title>
        <Card title="Icon">
          {
            [
              CheckIcon,
              WarningOutlineIcon,
              WarningFillIcon,
              InfoOutlineIcon,
              InfoFillIcon
            ].map((icon, i) => <span key={i}>{ icon({ size: 40 }) }</span>)
          }
        </Card>

        <Card title="Typography">
          <div className="flex">
            <div className="w-1/2">
            {
              [...Array(8).keys()].map(i => (
                <Title key={i} size={i+1}>Heading {i + 1}</Title>
              ))
            }
            </div>
            <div className="w-1/2">
            {
              [...Array(4).keys()].map(i => (
                <Text key={i} size={i+1} isBold={true}>Bold body {i + 1}</Text>
              ))
            }
            {
              [...Array(4).keys()].map(i => (
                <Text key={i} size={i+1}>Body {i + 1}</Text>
              ))
            }
            </div>
          </div>
        </Card>

        <Card title="Color">
        {
          Object.keys(colors).filter(c => c !== "transparent" && c !== "white").map((color, i) => (
            <div key={i} className="mb-5">
              <Title className="mb-3" size={3}>{ color.charAt(0).toUpperCase() + color.slice(1) }</Title>
              <div className="flex">
                {
                  typeof colors[color] === "string" ? (
                    <ColorCard hex={colors[color]} name="default"/>
                  ) : Object.keys(colors[color]).map((c, j) => (
                    <ColorCard key={j} hex={colors[color][c]} name={c}/>
                  ))
                }
              </div>
            </div>
          ))
        }
        </Card>

        <Card title="Image">
          <Image
            src="https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/768.jpeg"
            containerAspectRatio={728 / 485}
            sources={[
              {
                type: 'image/webp',
                srcSet: `
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/120.webp 120w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/320.webp 320w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/400.webp 400w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/640.webp 640w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/768.webp 768w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/1024.webp 1024w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/1366.webp 1366w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/1600.webp 1600w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/1920.webp 1920w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/2200.webp 2200w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/2350.webp 2350w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/2560.webp 2560w
                `,
              },
              {
                type: 'image/jpeg',
                srcSet: `
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/120.jpeg 120w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/320.jpeg 320w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/400.jpeg 400w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/640.jpeg 640w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/768.jpeg 768w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/1024.jpeg 1024w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/1366.jpeg 1366w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/1600.jpeg 1600w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/1920.jpeg 1920w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/2200.jpeg 2200w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/2350.jpeg 2350w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/2560.jpeg 2560w
                `,
              },
            ]}
            alt="Cat laying in the sun"
          />
        </Card>


        <Card title="Button">
          <Section title="Sizes">
            <div className="flex items-end">
              <Button>Large button</Button>
              <Button className="ml-3" size="small">Small button</Button>
            </div>
          </Section>

          <Section title="Themes">
            <div className="flex flex-wrap">
              {
                ['primary', 'secondary', 'tertiary', 'caution'].map((theme, i) => (
                  <Button key={i} className="mr-3 mb-3" theme={theme}>{ theme.charAt(0).toUpperCase() + theme.slice(1) }</Button>
                ))
              }
              <div className="bg-indigo p-3">
                <Button theme="solid">Solid</Button>
              </div>
            </div>
          </Section>

          <Section title="Variants">
            <SubSection title="Loading">
              <div className="flex flex-wrap">
                {
                  ['primary', 'secondary', 'tertiary'].map((theme, i) => (
                    <Button key={i} className="mr-3 mb-3" theme={theme} isLoading>{ theme.charAt(0).toUpperCase() + theme.slice(1) }</Button>
                  ))
                }
              </div>
            </SubSection>
            <SubSection title="States">
              <div className="flex flex-wrap">
                {
                  ['primary', 'secondary', 'tertiary', 'caution'].map((theme, i) => (
                    <Button key={i} className="mr-3 mb-3" theme={theme} isDisabled>{ theme.charAt(0).toUpperCase() + theme.slice(1) }</Button>
                  ))
                }
                <div className="bg-indigo p-3">
                  <Button theme="solid" isDisabled>Solid</Button>
                </div>
              </div>
            </SubSection>
            <SubSection title="With icon">
              <div className="flex items-end">
                <Button iconLeft={
                  <CheckIcon size="medium"/>
                } size="large">Large button</Button>
                <Button className="ml-3" size="small" iconLeft={<CheckIcon/>}>Small button</Button>
              </div>
            </SubSection>
          </Section>
        </Card>


        <Card title="Text Input">
          <Section title="With or without icon">
            <div className="flex">
              <TextInput
                value={textInput}
                onChange={setTextInput}
                placeholder="example@example.com"
                iconLeft={<CheckIcon/>}
                className="w-full"
              />
              <TextInput
                value={textInput}
                onChange={setTextInput}
                placeholder="example@example.com"
                className="ml-3 w-full"
              />
            </div>
          </Section>
          <Section title="Sizes">
            <div className="flex items-end">
              <TextInput
                value={textInput}
                onChange={setTextInput}
                placeholder="example@example.com"
                iconLeft={<CheckIcon/>}
                size="large"
                className="w-full"
              />
              <TextInput
                value={textInput}
                onChange={setTextInput}
                placeholder="example@example.com"
                className="ml-3 w-full"
                iconLeft={<CheckIcon/>}
                size="small"
              />
            </div>
          </Section>
          <Section title="States">
            <div className="flex items-end">
              <TextInput
                value={textInput}
                onChange={setTextInput}
                placeholder="example@example.com"
                iconLeft={<CheckIcon/>}
                size="large"
                isDisabled
              />
              <TextInput
                value={textInput}
                onChange={setTextInput}
                placeholder="example@example.com"
                className="ml-3"
                iconLeft={<CheckIcon/>}
                isReadOnly
              />
              <TextInput
                value={textInput}
                onChange={setTextInput}
                placeholder="example@example.com"
                className="ml-3"
                iconLeft={<CheckIcon/>}
                hasError
              />
            </div>
          </Section>
          <Section title="Label & Note">
            <div className="flex items-end">
              <TextInput
                label="Label"
                value={textInput}
                onChange={setTextInput}
                placeholder="example@example.com"
                className="w-full"
                size="large"
                note="This field should contain @"
              />
              <TextInput
                label="Label"
                value={textInput}
                onChange={setTextInput}
                placeholder="example@example.com"
                className="ml-3 w-full"
                size="small"
                note="This field should contain @"
              />
            </div>
          </Section>
        </Card>
        <Card title="Text Area">
          <Section title="States">
            <TextArea
              value={textInput}
              onChange={setTextInput}
              placeholder="example@example.com"
              label="Label"
              note="This is a note"
            />
            <TextArea
              value={textInput}
              onChange={setTextInput}
              placeholder="example@example.com"
              label="Label"
              note="This is a note"
              isDisabled
              className="mt-3"
            />
            <TextArea
              value={textInput}
              onChange={setTextInput}
              placeholder="example@example.com"
              label="Label"
              note="This is a note"
              hasError
              className="mt-3"
            />
          </Section>
        </Card>
        <Card title="Select">
          <Section title="Sizes">
            <div className="flex items-end">
              <Select label="Label" note="Note" className="w-full">
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </Select>
              <Select label="Label" note="Note" size="small" className="w-full ml-3">
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </Select>
            </div>
          </Section>
          <Section title="States">
            <div className="flex items-end">
              <Select label="Label" note="Note" hasError className="w-full">
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </Select>
              <Select label="Label" note="Note" isDisabled className="w-full ml-3">
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </Select>
            </div>
          </Section>
        </Card>
        <Card title="Checkbox">
          <Section title="Checked and not checked">
            <div className="flex items-end">
              <Checkbox isChecked>This is a checkbox</Checkbox>
              <Checkbox className="ml-3">This is a checkbox</Checkbox>
            </div>
          </Section>
          <Section title="States">
            <div className="flex items-end">
              <Checkbox isDisabled>This is a checkbox</Checkbox>
              <Checkbox hasError className="ml-3">This is a checkbox</Checkbox>
              <Checkbox isIndeterminate className="ml-3">This is a checkbox</Checkbox>
            </div>
          </Section>
        </Card>
        <Card title="Radio">
          <Section title="Checked and not checked">
            <div className="flex items-end">
              <Radio isChecked>This is a radio</Radio>
              <Radio className="ml-3">This is a radio</Radio>
            </div>
          </Section>
          <Section title="States">
            <div className="flex items-end">
              <Radio isDisabled>This is a radio</Radio>
              <Radio hasError className="ml-3">This is a radio</Radio>
            </div>
          </Section>
        </Card>
        <Card title="Avatar">
          <Section title="Variants">
            <div className="flex">
              <EntityAvatar className="mr-3" imageUrl="https://www.placecage.com/640/480" size="xlarge" />
              <UserAvatar imageUrl="https://www.placecage.com/640/480" size="xlarge" />
            </div>
          </Section>
          <Section title="Sizes">
            <div className="flex items-end">
              {["xlarge", "large", "medium", "small", "xsmall"].map((size, i) => (
                <EntityAvatar key={i} className="mr-3" imageUrl="https://www.placecage.com/640/480" size={size} />
              ))}
            </div>
          </Section>
          <Section title="Without image">
            <div className="flex items-end">
              <EntityAvatar className="mr-3" initial="A" size="xlarge" />
              <UserAvatar initials="BB" size="xlarge" />
            </div>
          </Section>
        </Card>
        <Card title="Star Rating">
          <Section title="Sizes">
            <div className="flex items-end">
              <StarRating rating={0} reviewsCount={5} showRating/>
              <StarRating className="ml-3" size="medium" rating={2.5} reviewsCount={5} showRating/>
              <StarRating className="ml-3" size="large" rating={5} reviewsCount={5} showRating/>
            </div>
          </Section>
        </Card>
        <Card title="Alert">
          <Section title="Themes">
            <Alert className="mb-3" theme="success">Alert Success</Alert>
            <Alert className="mb-3" theme="info">Alert Info</Alert>
            <Alert className="mb-3" theme="warning">Alert Warning</Alert>
            <Alert theme="caution">Alert Caution</Alert>
          </Section>
        </Card>
        <Card title="Banner Alert">
          <Section title="Themes">
            <BannerAlert className="mb-3" theme="info">Banner Info</BannerAlert>
            <BannerAlert className="mb-3" theme="warning">Banner Warning</BannerAlert>
            <BannerAlert theme="caution">Banner Caution</BannerAlert>
          </Section>
        </Card>
        <Card title="Chip">
          <Section title="Themes">
            <div className="mb-3">
              <FilterChip className="mr-3">Filter Chip</FilterChip>
              <FilterChip isSelected={true}>Filter Chip</FilterChip>
            </div>
            <div>
              <ToggleChip className="mr-3">Toggle Chip</ToggleChip>
              <ToggleChip isSelected={true}>Toggle Chip</ToggleChip>
            </div>
          </Section>
          <Section title="With Icon">
            <ToggleChip isSelected={true} iconRight={<CheckIcon/>}>Toggle Chip</ToggleChip>
          </Section>
        </Card>
        <Card title="Modal">
          <Section title="Width">
            <Button className="mr-3 mb-3" onClick={() => setModalIsOpen(true)}>Default width modal</Button>
            <Button className="mr-3 mb-3" onClick={() => setSmallWidthModalIsOpen(true)}>Small width modal</Button>
            <Button className="mr-3 mb-3" onClick={() => setLargeWidthModalIsOpen(true)}>Large width modal</Button>
          </Section>
          <Section title="Height">
            <Button className="mr-3 mb-3" onClick={() => setMediumHeightModalIsOpen(true)}>Medium height modal</Button>
            <Button className="mr-3 mb-3" onClick={() => setLargeHeightModalIsOpen(true)}>Large height modal</Button>
          </Section>
          <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
            <Title size={4}>This is a default width modal</Title>
          </Modal>
          <Modal width="small" isOpen={smallWidthModalIsOpen} onClose={() => setSmallWidthModalIsOpen(false)}>
            <Title size={4}>This is a small width modal</Title>
          </Modal>
          <Modal width="large" isOpen={largeWidthModalIsOpen} onClose={() => setLargeWidthModalIsOpen(false)}>
            <Title size={4}>This is a large width modal</Title>
          </Modal>
          <Modal height="medium" isOpen={mediumHeightModalIsOpen} onClose={() => setMediumHeightModalIsOpen(false)}>
            <Title size={4}>This is a medium height modal</Title>
          </Modal>
          <Modal height="large" isOpen={largeHeightModalIsOpen} onClose={() => setLargeHeightModalIsOpen(false)}>
            <Title size={4}>This is a large height modal</Title>
          </Modal>
        </Card>
        <Card title="Tooltip">
          <Section title="Position">
            <div className="flex">
              <Tooltip className="mr-3" text="This is a tooltip">
                <div className="flex items-center">
                  <InfoOutlineIcon size="medium"/>
                  <Title className="ml-2" size={5}>Top</Title>
                </div>
              </Tooltip>
              <Tooltip position="bottom" className="mr-3" text="This is a tooltip">
                <div className="flex items-center">
                  <InfoOutlineIcon size="medium"/>
                  <Title className="ml-2" size={5}>Bottom</Title>
                </div>
              </Tooltip>
            </div>
          </Section>
          <Section title="Theme">
            <div className="bg-indigo flex items-center justify-center text-white p-6">
              <Tooltip theme="light" text="This is a tooltip">
                <InfoOutlineIcon size="medium"/>
              </Tooltip>
            </div>
          </Section>
        </Card>
      </div>
    </div>
  )
}

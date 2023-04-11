import Image from 'next/image'
import CustomLink from './Link'
// import { SandboxCanvas } from '../data/blog/test.jsx'

function IFrame({ src, style, title }) {
  return (
    <iframe
      src={src}
      style={style}
      title={title}
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    />
  )
}

const MDXComponents = {
  Image,
  a: CustomLink,
  IFrame,
}

export default MDXComponents

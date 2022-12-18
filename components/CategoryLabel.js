import Link from 'next/link'
import PropTypes from 'prop-types';

export default function CategoryLabel({ children }) {
  const colorKey = {
    JavaScript: 'yellow',
    CSS: 'blue',
    Python: 'green',
    PHP: 'purple',
    Ruby: 'red',
  }

  return (
    <div
      className={`px-2 py-1 bg-${colorKey[children]}-600 text-gray-100 font-bold rounded`}
    >
      <Link href={`/blog/category/${children.toLowerCase()}`}>{children}</Link>
    </div>
  )
}
//zelim da komponenta ima dete i da ono bude string
//dete je u ovom slucaju naziv jezika na osnovu kojeg dajem boju i slag u linku
CategoryLabel.propTypes={
    children: PropTypes.string,
    children: PropTypes.element.isRequired
}
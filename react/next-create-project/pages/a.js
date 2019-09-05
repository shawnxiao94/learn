import Link from 'next/link'
import { withRouter } from 'next/router'

const A = ({ router }) => {
  return (
    <div>
      <span>a page</span>
      <Link href='/'>
        <div>goto index</div>
      </Link>
      { router.query.id }
    </div>
  )
}

export default withRouter(A)
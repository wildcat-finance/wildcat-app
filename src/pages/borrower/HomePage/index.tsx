import { Typography } from "../../../components/ui-components"

const HomePage = () => (
  <div>
    <Typography variant="h1">Hello</Typography>

    <div className="max-w-sm text-xs">
      We don’t recognise your wallet as a registered borrower. If you have not
      yet registered please do so via this{" "}
      <a
        target="_blank"
        href="https://rvficirw76q.typeform.com/to/FKBzhnmo"
        rel="noreferrer"
        className="underline"
      >
        Typeform
      </a>
      .
    </div>
  </div>
)

export default HomePage

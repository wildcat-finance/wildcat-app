import { AiOutlineExclamationCircle } from "react-icons/ai"
import { useAccount } from "wagmi"
import { useEffect, useMemo, useRef, useState } from "react"
import { AccountKind } from "@wildcatfi/wildcat-sdk"
import dayjs from "dayjs"

import {
  Paper,
  Button,
  TextInput,
  Tooltip,
} from "../../../components/ui-components"
import { BluePaper } from "../../../components/ui-components/BluePaper"
import { DownloadIcon, SignIcon } from "../../../components/ui-components/icons"
import { useEthersSigner } from "../../../modules/hooks"
import { useDescribeAccount } from "../../../hooks/useDescribeAccount"
import { useSignAgreement } from "./hooks/useSignAgreement"
import { toastifyError } from "../../../components/toasts"
import { useSubmitSignature } from "./hooks/useSubmitSignature"
import { useGnosisSafeSDK } from "../../../hooks/useGnosisSafeSDK"
import { WaitForSignatureModal } from "./WaitForSignatureModal"

const DATE_FORMAT = "MMMM DD, YYYY"

function ServiceAgreement() {
  const ref = useRef<HTMLInputElement | null>(null)

  const signer = useEthersSigner()
  const { address } = useAccount()
  const { isConnectedToSafe, sdk } = useGnosisSafeSDK()
  const [orgError, setOrgError] = useState<boolean>(false)
  const [organization, setOrganization] = useState("")
  const [dateSigned, setDateSigned] = useState<string>("")
  useEffect(() => {
    setDateSigned(dayjs(Date.now()).format(DATE_FORMAT))
  })

  const onOrganizationChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target
    setOrganization(value)
    if (value.length) {
      setOrgError(false)
    }
  }

  const { account } = useDescribeAccount(address)
  const { mutateAsync: signAgreement, isLoading: isSigning } =
    useSignAgreement()
  const [safeTxHash, setSafeTxHash] = useState<string | undefined>(undefined)

  const { mutateAsync: submitSignature, isLoading: isSubmitting } =
    useSubmitSignature()

  const scrollToInput = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
    ref.current?.focus()
  }

  const errorMessage = useMemo(() => {
    if (account?.kind === AccountKind.UnknownContract) {
      return `Wildcat currently only supports EOA and Gnosis Safe accounts for borrower on-boarding.`
    }
    return undefined
  }, [account])

  const handleSubmitForSafeTx = async () => {
    await submitSignature({
      signature: "0x",
      name: organization,
      dateSigned,
      address: address as string,
    }).then(() => {
      setSafeTxHash(undefined)
    })
  }

  const handleSign = async () => {
    if (!organization.length) {
      setOrgError(true)
      scrollToInput()
      toastifyError(`Please enter your organization's name`)
      // return
    } else {
      const result = await signAgreement({
        name: organization,
        dateSigned,
        address,
      })
      console.log(result)
      if (result.signature) {
        console.log({
          signature: result.signature,
          name: organization,
          dateSigned,
          address: address as string,
        })
        await submitSignature({
          signature: result.signature,
          name: organization,
          dateSigned,
          address: address as string,
        })
        // navigate("/borrower")
      } else if (result.safeTxHash) {
        console.log(await sdk?.txs.getBySafeTxHash(result.safeTxHash))
        // setSafeTxHash(result.safeTxHash)
        setSafeTxHash(result.safeTxHash)
      }
    }
  }

  const onReject = () => {
    setSafeTxHash(undefined)
  }

  return (
    <>
      <div className="text-green text-2xl font-bold mb-8 w-2/3">
        Wildcat Services Agreement
      </div>

      <BluePaper className="mb-8">
        <AiOutlineExclamationCircle height={24} />
        <span className="text-xs text-center">
          Please review and sign the Wildcat Services Agreement in order to
          access the app.
        </span>
      </BluePaper>

      <Paper className="bg-white max-h-3xl flex flex-col">
        <div className="overflow-scroll mt-5 pr-14 pl-8 flex-grow-1">
          <div className="font-bold text-xs">
            <p className="mb-4">
              This Wildcat Protocol Services Agreement (this ’Agreement’) sets
              out the terms and conditions under you access the Wildcat Protocol
              (the ’Protocol’) and accept the Services (as defined below) that
              the Service Provider (also referred to as ’us’; or ’we’) will
              provide in connection with the Protocol.
            </p>

            <p className="mb-4">
              By entering into this Agreement by clicking on the ’Sign’ (or
              similar) button, or by otherwise accessing or using the Protocol,
              you agree to be bound by the terms and conditions as set forth in
              this Agreement.
            </p>

            <p className="mb-4">
              Using the Protocol can involve various risks. You can suffer loss
              and that is a risk you shall be able to take. If you do not
              understand the risks or are not willing to accept the risks or
              suffer loss, you should not enter into transactions on, or
              otherwise use, the Protocol. Before transacting, you must
              carefully assess and consider the risks, including those contained
              in any documents we make available to you and obtain all necessary
              professional advice you need.
            </p>

            <p className="mb-4">
              You must decide for yourself whether you should participate in any
              transaction. The Service Provider is not required to advise you on
              the use of the Protocol and/or any aspects of a transaction you
              choose to enter into, protect or minimize your exposure to loss or
              provide any warnings to you. You must carefully consider and
              monitor your own transactions and in particular any loans you have
              made or taken out. We are not party to these transactions and
              therefore assume no obligation to monitor the same.
            </p>

            <p className="mb-4">
              Unless otherwise agreed by us in writing, anything the Service
              Provider, including any of its affiliates, officers, employees or
              agents, may say to you is opinion only. You must not rely on it or
              hold the Service Provider liable for it, even if it is wrong. The
              Service Provider will not be liable for your losses in any
              circumstances, except as expressly set out in this Agreement or as
              required by applicable law.
            </p>

            <p className="mb-4">
              This Agreement, including its Schedules, must be read in the
              context of any applicable Risk Disclosure Statement made available
              to you.
            </p>

            <p className="mb-4">
              You acknowledge that you have read, understood and agreed with the
              Risk Disclosure Statement that you can find on our Website (as
              defined below) and you will contact the Service Provider and/or
              cease to use the Protocol if you have any questions or concerns
              regarding the contents of the Risk Disclosure Statement.
            </p>

            <p className="mb-4">1. DEFINITIONS AND INTERPRETATION</p>

            <p className="mb-4">In this Agreement:</p>

            <p className="m-4">
              AFFILIATE means with respect to any party, any company or legal
              entity that directly or indirectly, through one or more
              intermediaries, controls, is controlled by or is under common
              control with such party; for which purposes ’control’ shall mean
              the ability to direct the management or policies of a company or
              legal entity: (a) through beneficial ownership of fifty percent
              (50%) or more of the voting shares or other securities of a
              company or legal entity; (b) in the position as general partner of
              a limited partnership or manager of a limited liability company;
              or (c) pursuant to a written agreement.
            </p>

            <p className="m-4">
              AGREEMENT means this Wildcat Protocol Services Agreement as the
              same may be amended, restated or otherwise modified from time to
              time at the Service Provider’s sole discretion;
            </p>

            <p className="m-4">
              AML/CTF PROVISIONS has the meaning specified in Clause 11.5(a);
            </p>

            <p className="m-4">
              ASSETS means any assets that a Borrower may borrow or try to
              borrow from a Lender;
            </p>

            <p className="m-4">
              BORROWER means any entity that has been approved as a borrower
              pursuant to the terms of this Agreement;
            </p>

            <p className="m-4">
              CONFIDENTIAL INFORMATION means information in whatever form
              (including without limitation, in written, oral, visual or
              electronic form or on any magnetic or optical disk or memory and
              wherever located) relating to the business, customers, products,
              affairs and finances of each Borrower and each Lender for the time
              being confidential to such Borrower or Lender and trade secrets
              including, without limitation, technical data and know-how
              relating to the business of such Borrower or Lender or any of its
              suppliers, customers, agents, distributors, shareholders,
              management or business contacts and including, but not limited to,
              information that the Service Provider creates, develops, receives
              or obtains in connection with this Agreement whether or not such
              information (if in anything other than oral form) is marked
              confidential;
            </p>

            <p className="m-4">
              FEE has the meaning specified in Clause 4.1(a);
            </p>

            <p className="m-4">
              FINANCIAL CRIME REGULATION means any applicable law or regulatory
              requirement pertaining to money laundering, terrorism financing,
              bribery, corruption, tax evasion, fraud, the trafficking of arms,
              drugs, humans or wildlife, slavery, proliferation of weapons of
              mass destruction, or evasion of sanctions. A reference to a
              violation of Financial Crime Regulation includes any acts or
              attempts to circumvent or violate any applicable laws relating to
              Financial Crime Regulation;
            </p>

            <p className="m-4">
              GOVERNMENT AGENCY means any governmental, semi-governmental,
              administrative, fiscal, regulatory, judicial or quasi-judicial
              body, department, commission, authority, tribunal, agency or
              entity;
            </p>

            <p className="m-4">
              LENDER means any entity that has been onboarded by a Borrower for
              the purpose of fulfilling the role of a lender on the Protocol;
            </p>

            <p className="m-4">
              LOSS means damage, loss, cost, claim, liability, obligation or
              expense (including legal costs and expenses of any kind), of any
              kind whatsoever under any theory of liability, including direct,
              indirect, consequential, incidental or special losses, economic
              losses or loss of profits, loss of data, loss of goodwill or
              business reputation, loss of opportunity, cost of obtaining
              substitute tokens, or other tangible and intangible loss;
            </p>

            <p className="m-4">
              MCHL means Milagros Coldiron Holdings Limited, a business company
              with limited liability incorporated under the laws of the British
              Virgin Islands;
            </p>

            <p className="m-4">PROTOCOL means the Wildcat Protocol;</p>

            <p className="m-4">
              REPRESENTING PARTY has the meaning specified in Clause 5.1;
            </p>

            <p className="m-4">
              RISK DISCLOSURE STATEMENT means the risk disclosure statement, as
              may be amended from time to time, set out on the Website and any
              risk disclosure statement made available from time to time through
              the Website;
            </p>

            <p className="m-4">SERVICE PROVIDER means means MCHL;</p>

            <p className="m-4">
              SERVICES means the services provided by the Service Provider as
              more particularly described in the Schedule;
            </p>

            <p className="m-4">
              TERMINATION DATE means the date of termination of this Agreement,
              howsoever arising;
            </p>

            <p className="m-4">
              TERMINATION EVENT has the meaning specified in Clause 9(a); and
            </p>

            <p className="m-4">WEBSITE means wildcat.finance.</p>

            <p className="mb-4">
              Unless the context requires otherwise in this Agreement:
            </p>

            <p className="m-4">
              (a) references to a ’person’ are to be construed so as to include
              any individual, firm, company, government, state or agency of a
              state, local or municipal authority, or any joint venture,
              association or partnership (whether or not having separate legal
              personality); and
            </p>

            <p className="m-4">
              (b) references to any statutory provision are to such statutory
              provision as modified or re-enacted for the time being and include
              any analogous provision or rule under any applicable law.
            </p>

            <p className="mb-4">
              Except to the extent that the context otherwise requires, any
              reference in this Agreement to ’this Agreement’ or any other
              document, agreement or instrument is a reference to this Agreement
              or, as the case may be, the relevant document, agreement or
              instrument as may be amended, restated, supplemented, replaced or
              otherwise modified from time to time and includes any document
              which amends, restates, supplements, replaces, or otherwise
              modifies or is entered into, made or given pursuant to or in
              accordance with any of the terms of this Agreement or, as the case
              may be, the relevant document, agreement or instrument.
            </p>

            <p className="mb-4">2. PROVISION OF SERVICES</p>

            <p className="m-4">
              (a) Each Borrower and each Lender hereby agrees to be bound by the
              terms and conditions of this Agreement and hereby acknowledges
              that the Service Provider shall provide the Services on the terms
              of this Agreement.
            </p>

            <p className="m-4">
              (b) The Service Provider shall provide the Services until:
            </p>

            <p className="pl-8 pt-0 pb-2">
              (i) the occurrence of any event which (a) results in the continued
              operation of the Protocol ceasing to be feasible or (b) would
              cause the Service Provider to operate in an improper or illegal
              manner, in each case as determined by the Service Provider in its
              sole discretion; or
            </p>

            <p className="pl-8 pt-0 pb-4">
              (ii) solely with respect to the provision of Services to the
              relevant Borrower or Lender, the occurrence of a Termination Event
              with respect to such Borrower or such Lender.
            </p>

            <p className="mb-4">3. DUTIES AND OBLIGATIONS</p>

            <p className="m-4">(a) The Service Provider shall:</p>

            <p className="pl-8 pt-0 pb-2">(i) provide the Services, and;</p>

            <p className="pl-8 pt-0 pb-0">
              (ii) comply with all applicable laws and regulations.
            </p>

            <p className="m-4">(b) The Service Provider shall not:</p>

            <p className="pl-8 pt-0 pb-2">
              (i) assist with the onboarding of any Lender, including any
              anti-money laundering or ’know your client’ screening;
            </p>

            <p className="pl-8 pt-0 pb-2">
              (ii) be involved in any transactions entered into between any
              Borrower and any Lender;
            </p>

            <p className="pl-8 pt-0 pb-2">(iii) receive or hold any Assets;</p>

            <p className="pl-8 pt-0 pb-2">
              (iv) except for the security monitoring responsibilities as
              provided in the Schedule hereto, have any obligation to provide
              ongoing security for the Borrowers, the Lenders and the Protocol;
              and
            </p>

            <p className="pl-8 pt-0 pb-4">
              (v) except as provided in the Schedule hereto, have any
              obligations in the event of a market delinquency.
            </p>

            <p className="mb-4">4. FEES</p>

            <p className="m-4">
              (a) For providing the Services the Service Provider shall be
              entitled to receive a fee pursuant to the protocol fee
              configuration under which the relevant market is deployed (the
              ’Fee’).
            </p>
            <p className="m-4">
              (b) The Service Provider may, in its sole discretion, revise a Fee
              in the event (i) in the case of a Fee that is a fixed origination
              fee, the origination fee asset becomes unreasonable to continue
              utilising (i.e. depeg, underlying contract migration); or (ii) in
              the case of a Fee that is represented as a proportion of base
              annual percentage return, the designated fee recipient address
              becomes inaccessible; provided however, that notwithstanding the
              foregoing, no Fee shall be retroactively revised once a market has
              been deployed under a protocol fee configuration.
            </p>

            <p className="m-4">
              (c) Each Borrower hereby acknowledges and agrees that the Service
              Provider has the right to revise any Fee pursuant to Clause 4(b).
            </p>

            <p className="mb-4">5. BORROWER AND LENDER REPRESENTATIONS</p>

            <p className="mb-4">
              5.1. Making And Repetition Of Representations
            </p>

            <p className="m-4">
              Each Borrower and each Lender (each a ’Representing Party’) makes
              the representations contained in this Clause 5 to the Service
              Provider.
            </p>

            <p className="mb-4">5.2. No Reliance Or Advice</p>

            <p className="m-4">
              (a) This Agreement is suitable for the Representing Party, based
              upon its own judgement.
            </p>
            <p className="m-4">
              (b) The Representing Party has made its own independent decision
              to enter into this Agreement.
            </p>

            <p className="m-4">
              (c) The Representing Party has obtained such independent advice
              regarding this Agreement as it considers necessary, or has freely
              chosen not to obtain such independent advice.
            </p>

            <p className="m-4">
              (d) The Service Provider is not an adviser to the Representing
              Party, and has not advised the Representing Party in connection
              with this Agreement.
            </p>

            <p className="m-4">
              (e) The Representing Party is not relying on any communication of
              any kind from the Service Provider or made by the Service Provider
              as advice, recommendation or guarantee of result in connection
              with this Agreement.
            </p>

            <p className="mb-4">5.3. Evaluation And Understanding</p>

            <p className="m-4">
              (a) The Representing Party is capable of assessing and
              understanding (on its own behalf or through independent
              professional advice), and understands and accepts, the terms,
              conditions and risks of this Agreement.
            </p>

            <p className="m-4">
              (b) The Representing Party is capable of assuming, and assumes,
              all risks associated with this Agreement.
            </p>

            <p className="mb-4">5.4. Risk Disclosure Statement</p>

            <p className="m-4">
              The Representing Party has received, read and understood the Risk
              Disclosure Statement.
            </p>

            <p className="mb-4">5.5. Accuracy Of Specified Information</p>

            <p className="m-4">
              All applicable information that is furnished by the Representing
              Party to the Service Provider or the Protocol is, as of the date
              of the information, true, accurate and complete in every material
              respect.
            </p>

            <p className="mb-4">5.6. Power To Act</p>

            <p className="m-4">
              Each Borrower and each Lender represents and warrants that (a) it
              has the power to execute and deliver this Agreement and to perform
              its obligations hereunder, (b) it has taken all necessary action
              to authorize such execution, delivery and performance, and (iii)
              this Agreement constitutes a legal, valid, and binding obligation
              enforceable against it in accordance with the terms hereunder.
            </p>

            <p className="mb-4">6. CONFIDENTIALITY</p>

            <p className="m-4">
              (a) The Service Provider acknowledges that in the course of
              providing the Services it may have access to Confidential
              Information.
            </p>

            <p className="m-4">
              (b) The Service Provider shall not (except in the proper course of
              its duties) use or disclose to any third party (and shall use its
              best endeavours to prevent the publication or disclosure of) any
              Confidential Information. This restriction does not apply to:
            </p>

            <p className="pl-8 pt-0 pb-2">
              (i) any use or disclosure authorised by a Borrower or a Lender or
              as required by law; or
            </p>

            <p className="pl-8 pt-0 pb-4">
              (ii) any information which is already in, or comes into, the
              public domain otherwise than through the Service Provider’s
              unauthorised disclosure.
            </p>

            <p className="mb-4">7. LIMITATION OF LIABILITY</p>

            <p className="mb-4">7.1. Liability For Loss</p>

            <p className="m-4">
              (a) The Service Provider is not liable for any Loss arising out of
              or relating to this Agreement or the Protocol, whether for breach
              of contract, tort, negligence, or other form of action or theory
              of liability, and irrespective of whether the Service Provider or
              the Borrowers or the Lenders have been advised of the possibility
              of any such Loss, unless such Loss arises directly from the
              Service Provider’s or its Affiliates’ wilful default, gross
              negligence or actual fraud.
            </p>

            <p className="m-4">
              (b) The Service Provider will not be responsible or liable for the
              acts or omissions of its Affiliates or any third party.
            </p>

            <p className="mb-4">7.2. Specific Liabilities</p>

            <p className="m-4">
              (a) This Clause 7.2 is without prejudice to the generality of
              Clause 7.1.
            </p>

            <p className="m-4">
              (b) The Service Provider will not be liable to any Borrower or any
              Lender for any Loss arising from any failure, interruption or
              delay in performance of any obligation arising under this
              Agreement resulting from acts or events not reasonably within the
              Service Provider’s control including without limitation, acts of
              war and terrorism, insurrection, civil disorder, acts of God,
              industrial action, any acts or regulations of any Government
              Agency, or any other operational or technical failures.
            </p>

            <p className="m-4">
              (c) The Service Provider will not be liable for any Loss,
              liability, cost or expense whatsoever arising from unauthorised
              use of the Protocol. Each Borrower and each Lender will, on
              demand, indemnify, protect and hold the Service Provider harmless
              from and against all Losses, liabilities, judgments, suits,
              actions, proceedings, claims, damages and costs resulting from or
              arising out of any act or omission by any person using the
              Protocol or accessing the Service Provider’s services through use
              of a Borrower&#39;s or a Lender’s designated passwords, systems
              and devices, whether or not such Borrower or such Lender has
              authorised such use.
            </p>

            <p className="m-4">
              (d) The Service Provider will not be liable for any Loss arising
              from any attack on the Protocol, including any such potential
              attacks as may be detailed in the Risk Disclosure Statement.
            </p>

            <p className="mb-4">7.3. Disclaimer Of Warranties</p>

            <p className="m-4">
              (a) Each Borrower and each Lender acknowledges and accepts that
              the Service Provider makes no representations or warranties,
              express or implied, with respect to the Protocol or any Assets.
            </p>

            <p className="m-4">
              (b) To the extent possible, all warranties, express or implied,
              including without limitation any implied warranties of
              merchantability and fitness for a particular purpose, are
              disclaimed by the Service Provider.
            </p>

            <p className="mb-4">8. INDEMNITY TO THE SERVICE PROVIDER</p>

            <p className="mb-4">
              Each Borrower and each Lender agrees to indemnify the Service
              Provider and keep it indemnified at all times against all or any
              costs, claims, damages or expenses incurred by the Service
              Provider arising during the course of the Service Provider
              providing the Services save for costs, claims, damages or expenses
              arising due to the Service Provider’s actual fraud, gross
              negligence or wilful default.
            </p>

            <p className="mb-4">9. TERMINATION</p>

            <p className="m-4">
              (a) This Agreement shall be terminated with immediate effect in
              respect of a Borrower or Lender as the case may be if at any time
              a Borrower or Lender (each of the following a ’Termination
              Event’):
            </p>

            <p className="pl-8 pt-0 pb-2">
              (i) commits any gross misconduct affecting the Protocol as
              determined by the Service Provider at its sole discretion;
            </p>

            <p className="pl-8 pt-2 pb-2">
              (ii) commits any serious or repeated breach or non-observance of
              any of the provisions of this Agreement;
            </p>

            <p className="pl-8 pt-2 pb-2">
              (iii) is declared bankrupt or makes any arrangement with or for
              the benefit of its creditors;
            </p>

            <p className="pl-8 pt-2 pb-2">
              (iv) commits any fraud or dishonesty or acts in any manner which
              in the opinion of the Borrowers and the Lenders brings or is
              likely to bring the Service Provider or the Borrowers or the
              Lenders into disrepute or is materially adverse to the interests
              of the Borrowers or the Lenders;
            </p>

            <p className="pl-8 pt-2 pb-2">
              (v) commits any offence under any applicable anti-corruption,
              anti-bribery, anti-money laundering or countering of terrorist
              financing (or similar) legislation and regulations; or
            </p>

            <p className="pl-8 pt-2 pb-2">
              (vi) is added to any list of persons sanctioned by the USA or the
              United Kingdom as confirmed by the Chainalysis oracle from time to
              time.
            </p>

            <p className="m-4">
              (b) To the extent possible, all warranties, express or implied,
              including without limitation any implied warranties of
              merchantability and fitness for a particular purpose, are
              disclaimed by the Service Provider.
            </p>

            <p className="m-4">
              (c) The rights of the Service Provider under this Clause are
              without prejudice to any other rights that they may have at law to
              terminate the Agreement or to accept any breach of this Agreement
              on the part of a Borrower or Lender as having brought the
              Agreement to an end. Any delay by the Service Provider in
              exercising its rights to terminate shall not constitute a waiver
              of these rights.
            </p>

            <p className="mb-4">10. NO RELATIONSHIP</p>

            <p className="mb-4">
              This Agreement does not create any kind of partnership, joint
              venture, fiduciary, agency or trustee relationship or any similar
              relationship or legal arrangement between the parties or between
              either party and any other person.
            </p>

            <p className="mb-4">11. COMPLIANCE</p>

            <p className="mb-4">11.1. Breach Of Financial Crime Regulations</p>

            <p className="m-4">
              Notwithstanding any other provision of this Agreement to the
              contrary, the Service Provider is not obliged to do or omit to do
              anything if it would, or might in its reasonable opinion,
              constitute a breach of any Financial Crime Regulation.
            </p>

            <p className="mb-4">
              11.2. Compliance With Financial Crime Regulations
            </p>

            <p className="m-4">
              Each Borrower and each Lender agrees to exercise its rights and
              perform its obligations under this Agreement in accordance with
              all Financial Crime Regulations.
            </p>

            <p className="mb-4">11.3. Disclosure</p>

            <p className="m-4">
              (a) The Participant agrees that Service Provider may disclose any
              information concerning any Borrower or any Lender to any
              Government Agency or court (in any jurisdiction), where required
              by applicable law.
            </p>

            <p className="m-4">
              (b) Without prejudice to any other provision of this Agreement
              relating to data or its disclosure, each Borrower and each Lender
              consents to the disclosure by the Service Provider or their
              Affiliates of any information or data in connection with or
              relating to such Borrower or such Lender and/or this Agreement, to
              the extent that the Service Provider determines it is required,
              permitted or desirable to:
            </p>

            <p className="pl-8 pt-0 pb-2">
              (i) comply with any applicable law; or
            </p>
            <p className="pl-8 pt-2 pb-0">(ii) operate the Protocol.</p>

            <p className="m-4">
              (c) If the relevant information relates to a third party, such
              Borrower or such Lender will obtain the third party’s consent to
              that disclosure.
            </p>

            <p className="mb-4">11.4. Anti-Money Laundering And Sanctions</p>

            <p className="m-4">
              (a) Notwithstanding any other provision of this Agreement to the
              contrary, the Service Provider is not obliged to do or omit to do
              anything if it would, or might in its reasonable opinion,
              constitute a breach of any Financial Crime Regulation or any
              anti-money laundering, counter-terrorism financing or economic or
              trade sanctions laws (“AML/CTF Provisions”) applicable to the
              Service Provider.
            </p>

            <p className="m-4">
              (b) Each Borrower and each Lender must provide to the Service
              Provider upon request all information and documents that are
              within its possession, custody or control reasonably required by
              the Service Provider from time to time, and as necessary in order
              for the Service Provider to comply with any AML/CTF Provisions or
              ongoing customer due diligence requirements or regulations
              applicable to the Service Provider.
            </p>

            <p className="m-4">
              (c) Each Borrower and each Lender agrees that the Service Provider
              may disclose any information concerning such Borrower or such
              Lender to any Government Agency or court (in any jurisdiction)
              where required by applicable law.
            </p>

            <p className="m-4">
              (d) Each Borrower and each Lender agrees to exercise its rights
              and perform its obligations under this Agreement in accordance
              with all applicable AML/CTF Provisions and ongoing customer due
              diligence requirements and regulations.
            </p>

            <p className="mb-4">12. FURTHER ASSURANCE</p>

            <p className="mb-4">
              Each Borrower and each Lender shall perform, execute and deliver
              such further acts and documents as may be required by law or
              reasonably requested by the Service Provider to implement the
              purposes of and to perfect this Agreement.
            </p>

            <p className="mb-4">13. PARTIAL INVALIDITY</p>

            <p className="mb-4">
              If any provision of this Agreement is or becomes or is found by a
              court or other competent authority to be illegal, invalid or
              unenforceable in any respect, in whole or in part, under any law
              of any jurisdiction, neither the legality, validity and
              enforceability in that jurisdiction of any other provision or part
              of this Agreement, nor the legality, validity or enforceability in
              any other jurisdiction of that provision or part or of any other
              provision of this Agreement, shall be affected or impaired.
            </p>

            <p className="mb-4">
              14. VARIATION, ASSIGNMENT, SUCCESSORS AND ASSIGNS
            </p>

            <p className="m-4">
              (a) No variation of this Agreement shall be valid unless it is in
              writing and signed by or on behalf of each of the parties.
            </p>

            <p className="m-4">
              (b) This Agreement is binding on and inures to the benefit of the
              parties and their respective successors, heirs, personal
              representatives, and permitted assigns.
            </p>

            <p className="m-4">
              (c) No Borrower or Lender may assign or delegate its rights or
              obligations hereunder without the Service Provider’s prior written
              consent, which may be withheld in the Service Provider’s sole
              discretion.
            </p>

            <p className="m-4">
              (d) The Service Provider may assign, novate or otherwise deal with
              its rights or obligations under this Agreement without the consent
              of, or notification to, any Borrower or any Lender.
            </p>

            <p className="mb-4">15. INTENTION TO BE BOUND</p>

            <p className="mb-4">
              By clicking on the “Sign” (or similar) button, or by otherwise
              accessing or using the Protocol, each Borrower and each Lender
              intends to be legally bound by the terms and conditions of this
              Agreement.
            </p>

            <p className="mb-4">16. ELECTRONIC EXECUTION</p>

            <p className="m-4">
              (a) The parties acknowledge and agree that this Agreement may be
              executed by electronic signature, and may be delivered
              electronically. Without limitation to the generality of this
              Clause 16, the parties agree that either DocuSign (and similar
              services) or various cryptographic message signing techniques
              (such as the ECDSA signing algorithm) may be used to execute and
              deliver this Agreement.
            </p>

            <p className="m-4">
              (b) Communications that are digitally signed and supported by a
              digital certificate have the same validity, admissibility and
              enforceability as if signed in writing.
            </p>

            <p className="m-4">
              (c) Any notice or communication that is digitally signed must
              comply with any applicable law.
            </p>

            <p className="mb-4">17. ARBITRATION</p>

            <p className="mb-4">17.1. Submission To Arbitration</p>

            <p className="m-4">
              (a) Any dispute, controversy, difference or claim arising out of
              or relating to this Agreement, including the existence, validity,
              interpretation, performance, breach or termination thereof or any
              dispute regarding non-contractual obligations arising out of or
              relating to this Agreement shall be settled by arbitration
              pursuant to the BVI IAC Arbitration Rules.
            </p>

            <p className="m-4">
              (b) Each Borrower and each Lender agrees that:
            </p>

            <p className="pl-8 pt-0 pb-2">
              (i) the law of this Clause 17 is British Virgin Islands law;
            </p>
            <p className="pl-8 pt-2 pb-2">
              (ii) the seat of arbitration will be the Road Town, Tortola,
              British Virgin Islands;
            </p>
            <p className="pl-8 pt-2 pb-2">
              (iii) unless the parties to the arbitration agree otherwise, the
              number of arbitrators will be one and such arbitrator must have
              relevant legal and technological expertise;
            </p>
            <p className="pl-8 pt-2 pb-2">
              (iv) the arbitration proceedings will be conducted in English.
            </p>

            <p className="mb-4">17.2. Injunctive Remedies</p>

            <p className="m-4">
              Notwithstanding any other provision of this Agreement, including
              for the avoidance of doubt Clause 17.1, each Borrower and each
              Lender agrees that the Service Provider has the right to apply for
              injunctive remedies (or an equivalent type of urgent legal relief)
              in any jurisdiction.
            </p>

            <p className="mb-4">18. GOVERNING LAW</p>

            <p className="m-4">
              This Agreement (including any non-contractual obligations or
              liabilities arising out of it or in connection with it) is
              governed by and is to be construed in accordance with the laws of
              the British Virgin Islands.
            </p>

            <p className="mb-4">SCHEDULE: SERVICES</p>

            <p className="mb-4">
              ● Market delinquency monitoring, including monitoring reserve
              ratios for each market to ensure such markets do not go below the
              reserve ratio and become delinquent.
            </p>

            <p className="mb-4">
              ● Security monitoring of the Protocol, including:
            </p>

            <p className="m-4">
              ○ reviewing transactions rejected by any integrated security
              solutions provider and provisioning such relevant maintenance or
              updating of code that the Service Provider (in its sole
              discretion) deems necessary for ongoing security; and
            </p>

            <p className="m-4">
              ○ overseeing any bug bounty programs existing at any such time,
              diagnosing and adjusting identified bugs and paying rewards under
              any bug bounty program to a whitehat that accurately identifies a
              bug.
            </p>

            {!isConnectedToSafe && (
              <p className="mb-4 mt-4">Date: {dateSigned}</p>
            )}

            <div className="flex flex-row items-center justify-start">
              <p>
                Organization Name:{" "}
                <Tooltip content="This will be displayed publicly" />
              </p>

              <TextInput
                className="w-72 ml-2"
                ref={ref}
                error={orgError}
                value={organization}
                onChange={onOrganizationChange}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-8 justify-center mb-9 mt-9">
          <Button
            variant="glacier"
            icon={<SignIcon />}
            disabled={isSigning || isSubmitting}
            onClick={handleSign}
          >
            Sign
          </Button>

          <a href="/pdf/Wildcat_Protocol_Services_Agreement.pdf" download>
            <Button variant="gold" icon={<DownloadIcon />}>
              Download
            </Button>
          </a>
        </div>

        {safeTxHash && (
          <WaitForSignatureModal
            safeTxHash={safeTxHash}
            onClose={handleSubmitForSafeTx}
            onReject={onReject}
          />
        )}
      </Paper>
    </>
  )
}

export default ServiceAgreement

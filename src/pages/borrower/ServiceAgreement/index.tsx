import { useNavigate } from "react-router-dom"

import { AiOutlineExclamationCircle } from "react-icons/ai"
import { Paper, Button } from "../../../components/ui-components"
import { BluePaper } from "../../../components/ui-components/BluePaper"
import { DownloadIcon, SignIcon } from "../../../components/ui-components/icons"
import { useAgreementStore } from "../../../store/useAgreementStore"

function ServiceAgreement() {
  const navigate = useNavigate()
  const { setSignedAgreement } = useAgreementStore()

  return (
    <>
      <div className="text-green text-2xl font-bold mb-8 w-2/3">
        Wildcat Service Agreement
      </div>

      <BluePaper className="mb-8">
        <AiOutlineExclamationCircle height={24} />
        <span className="text-xs text-center">
          Please review and sign the Wildcat Service Agreement in order to
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

            <p className="m-8">
              (i) the occurrence of any event which (a) results in the continued
              operation of the Protocol ceasing to be feasible or (b) would
              cause the Service Provider to operate in an improper or illegal
              manner, in each case as determined by the Service Provider in its
              sole discretion; or
            </p>

            <p className="m-8">
              (ii) solely with respect to the provision of Services to the
              relevant Borrower or Lender, the occurrence of a Termination Event
              with respect to such Borrower or such Lender.
            </p>

            <p className="mb-4">3. DUTIES AND OBLIGATIONS</p>

            <p className="m-4">(a) The Service Provider shall:</p>

            <p className="m-8">(i) provide the Services, and;</p>

            <p className="m-8">
              (ii) comply with all applicable laws and regulations.
            </p>

            <p className="m-4">(b) The Service Provider shall not:</p>

            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              nec fringilla dolor. Vestibulum blandit luctus nisi a aliquet.
            </p>
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              nec fringilla dolor. Vestibulum blandit luctus nisi a aliquet.
            </p>
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              nec fringilla dolor. Vestibulum blandit luctus nisi a aliquet.
            </p>
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              nec fringilla dolor. Vestibulum blandit luctus nisi a aliquet.
            </p>
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              nec fringilla dolor. Vestibulum blandit luctus nisi a aliquet.
            </p>
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              nec fringilla dolor. Vestibulum blandit luctus nisi a aliquet.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-8 justify-center mb-9 mt-9">
          <Button
            variant="blue"
            icon={<SignIcon />}
            onClick={() => setSignedAgreement(true)}
          >
            Sign
          </Button>

          <Button variant="gold" icon={<DownloadIcon />}>
            Download
          </Button>
        </div>
      </Paper>
    </>
  )
}

export default ServiceAgreement

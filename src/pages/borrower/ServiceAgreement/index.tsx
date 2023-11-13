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

      <Paper className="max-h-3xl flex flex-col">
        <div className="overflow-scroll mt-5 pr-14 pl-8 flex-grow-1">
          <div className="font-bold text-xs">
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              nec fringilla dolor. Vestibulum blandit luctus nisi a aliquet.
              Nulla fermentum arcu et nisl vulputate viverra. Proin viverra sit
              amet sapien faucibus maximus. Integer vel urna tempus, elementum
              erat nec, molestie mi. Vivamus ligula massa, lobortis ac enim sit
              amet, facilisis ultrices mauris. Mauris rutrum risus a sapien
              convallis, vitae lacinia est tempus. Donec elit leo, tincidunt id
              pellentesque vitae, tincidunt vel diam. Donec rhoncus scelerisque
              tellus sed tempor. Fusce a elit sed tellus venenatis vulputate.
              Aliquam sit amet lectus at lacus cursus pharetra. Aenean lacinia
              nisi velit. Nullam pretium odio vitae sapien efficitur auctor.
              Maecenas suscipit urna id tellus efficitur pretium. Quisque eu
              ante arcu. Sed non leo et erat tempor pretium ut quis quam.
              Integer rhoncus dignissim nulla rhoncus dapibus. Sed viverra
              pretium congue. Donec tincidunt fermentum orci fringilla finibus.
              Aenean vitae arcu vel lacus tempus pulvinar ut vitae nunc.
              Suspendisse vel consectetur massa, non ullamcorper orci. Maecenas
              id dignissim justo. Sed ac euismod purus, id aliquet magna.
            </p>

            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              nec fringilla dolor. Vestibulum blandit luctus nisi a aliquet.
              Nulla fermentum arcu et nisl vulputate viverra. Proin viverra sit
              amet sapien faucibus maximus. Integer vel urna tempus, elementum
              erat nec, molestie mi. Vivamus ligula massa, lobortis ac enim sit
              amet, facilisis ultrices mauris. Mauris rutrum risus a sapien
              convallis, vitae lacinia est tempus. Donec elit leo, tincidunt id
              pellentesque vitae, tincidunt vel diam. Donec rhoncus scelerisque
              tellus sed tempor. Fusce a elit sed tellus venenatis vulputate.
              Aliquam sit amet lectus at lacus cursus pharetra. Aenean lacinia
              nisi velit. Nullam pretium odio vitae sapien efficitur auctor.
              Maecenas suscipit urna id tellus efficitur pretium. Quisque eu
              ante arcu. Sed non leo et erat tempor pretium ut quis quam.
              Integer rhoncus dignissim nulla rhoncus dapibus. Sed viverra
              pretium congue. Donec tincidunt fermentum orci fringilla finibus.
              Aenean vitae arcu vel lacus tempus pulvinar ut vitae nunc.
              Suspendisse vel consectetur massa, non ullamcorper orci. Maecenas
              id dignissim justo. Sed ac euismod purus, id aliquet magna.
            </p>

            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              nec fringilla dolor. Vestibulum blandit luctus nisi a aliquet.
              Nulla fermentum arcu et nisl vulputate viverra. Proin viverra sit
              amet sapien faucibus maximus. Integer vel urna tempus, elementum
              erat nec, molestie mi. Vivamus ligula massa, lobortis ac enim sit
              amet, facilisis ultrices mauris. Mauris rutrum risus a sapien
              convallis, vitae lacinia est tempus. Donec elit leo, tincidunt id
              pellentesque vitae, tincidunt vel diam. Donec rhoncus scelerisque
              tellus sed tempor. Fusce a elit sed tellus venenatis vulputate.
              Aliquam sit amet lectus at lacus cursus pharetra. Aenean lacinia
              nisi velit. Nullam pretium odio vitae sapien efficitur auctor.
              Maecenas suscipit urna id tellus efficitur pretium. Quisque eu
              ante arcu. Sed non leo et erat tempor pretium ut quis quam.
              Integer rhoncus dignissim nulla rhoncus dapibus. Sed viverra
              pretium congue. Donec tincidunt fermentum orci fringilla finibus.
              Aenean vitae arcu vel lacus tempus pulvinar ut vitae nunc.
              Suspendisse vel consectetur massa, non ullamcorper orci. Maecenas
              id dignissim justo. Sed ac euismod purus, id aliquet magna.
            </p>

            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              nec fringilla dolor. Vestibulum blandit luctus nisi a aliquet.
              Nulla fermentum arcu et nisl vulputate viverra. Proin viverra sit
              amet sapien faucibus maximus. Integer vel urna tempus, elementum
              erat nec, molestie mi. Vivamus ligula massa, lobortis ac enim sit
              amet, facilisis ultrices mauris. Mauris rutrum risus a sapien
              convallis, vitae lacinia est tempus. Donec elit leo, tincidunt id
              pellentesque vitae, tincidunt vel diam. Donec rhoncus scelerisque
              tellus sed tempor. Fusce a elit sed tellus venenatis vulputate.
              Aliquam sit amet lectus at lacus cursus pharetra. Aenean lacinia
              nisi velit. Nullam pretium odio vitae sapien efficitur auctor.
              Maecenas suscipit urna id tellus efficitur pretium. Quisque eu
              ante arcu. Sed non leo et erat tempor pretium ut quis quam.
              Integer rhoncus dignissim nulla rhoncus dapibus. Sed viverra
              pretium congue. Donec tincidunt fermentum orci fringilla finibus.
              Aenean vitae arcu vel lacus tempus pulvinar ut vitae nunc.
              Suspendisse vel consectetur massa, non ullamcorper orci. Maecenas
              id dignissim justo. Sed ac euismod purus, id aliquet magna.
            </p>

            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              nec fringilla dolor. Vestibulum blandit luctus nisi a aliquet.
              Nulla fermentum arcu et nisl vulputate viverra. Proin viverra sit
              amet sapien faucibus maximus. Integer vel urna tempus, elementum
              erat nec, molestie mi. Vivamus ligula massa, lobortis ac enim sit
              amet, facilisis ultrices mauris. Mauris rutrum risus a sapien
              convallis, vitae lacinia est tempus. Donec elit leo, tincidunt id
              pellentesque vitae, tincidunt vel diam. Donec rhoncus scelerisque
              tellus sed tempor. Fusce a elit sed tellus venenatis vulputate.
              Aliquam sit amet lectus at lacus cursus pharetra. Aenean lacinia
              nisi velit. Nullam pretium odio vitae sapien efficitur auctor.
              Maecenas suscipit urna id tellus efficitur pretium. Quisque eu
              ante arcu. Sed non leo et erat tempor pretium ut quis quam.
              Integer rhoncus dignissim nulla rhoncus dapibus. Sed viverra
              pretium congue. Donec tincidunt fermentum orci fringilla finibus.
              Aenean vitae arcu vel lacus tempus pulvinar ut vitae nunc.
              Suspendisse vel consectetur massa, non ullamcorper orci. Maecenas
              id dignissim justo. Sed ac euismod purus, id aliquet magna.
            </p>

            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              nec fringilla dolor. Vestibulum blandit luctus nisi a aliquet.
              Nulla fermentum arcu et nisl vulputate viverra. Proin viverra sit
              amet sapien faucibus maximus. Integer vel urna tempus, elementum
              erat nec, molestie mi. Vivamus ligula massa, lobortis ac enim sit
              amet, facilisis ultrices mauris. Mauris rutrum risus a sapien
              convallis, vitae lacinia est tempus. Donec elit leo, tincidunt id
              pellentesque vitae, tincidunt vel diam. Donec rhoncus scelerisque
              tellus sed tempor. Fusce a elit sed tellus venenatis vulputate.
              Aliquam sit amet lectus at lacus cursus pharetra. Aenean lacinia
              nisi velit. Nullam pretium odio vitae sapien efficitur auctor.
              Maecenas suscipit urna id tellus efficitur pretium. Quisque eu
              ante arcu. Sed non leo et erat tempor pretium ut quis quam.
              Integer rhoncus dignissim nulla rhoncus dapibus. Sed viverra
              pretium congue. Donec tincidunt fermentum orci fringilla finibus.
              Aenean vitae arcu vel lacus tempus pulvinar ut vitae nunc.
              Suspendisse vel consectetur massa, non ullamcorper orci. Maecenas
              id dignissim justo. Sed ac euismod purus, id aliquet magna.
            </p>

            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              nec fringilla dolor. Vestibulum blandit luctus nisi a aliquet.
              Nulla fermentum arcu et nisl vulputate viverra. Proin viverra sit
              amet sapien faucibus maximus. Integer vel urna tempus, elementum
              erat nec, molestie mi. Vivamus ligula massa, lobortis ac enim sit
              amet, facilisis ultrices mauris. Mauris rutrum risus a sapien
              convallis, vitae lacinia est tempus. Donec elit leo, tincidunt id
              pellentesque vitae, tincidunt vel diam. Donec rhoncus scelerisque
              tellus sed tempor. Fusce a elit sed tellus venenatis vulputate.
              Aliquam sit amet lectus at lacus cursus pharetra. Aenean lacinia
              nisi velit. Nullam pretium odio vitae sapien efficitur auctor.
              Maecenas suscipit urna id tellus efficitur pretium. Quisque eu
              ante arcu. Sed non leo et erat tempor pretium ut quis quam.
              Integer rhoncus dignissim nulla rhoncus dapibus. Sed viverra
              pretium congue. Donec tincidunt fermentum orci fringilla finibus.
              Aenean vitae arcu vel lacus tempus pulvinar ut vitae nunc.
              Suspendisse vel consectetur massa, non ullamcorper orci. Maecenas
              id dignissim justo. Sed ac euismod purus, id aliquet magna.
            </p>

            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              nec fringilla dolor. Vestibulum blandit luctus nisi a aliquet.
              Nulla fermentum arcu et nisl vulputate viverra. Proin viverra sit
              amet sapien faucibus maximus. Integer vel urna tempus, elementum
              erat nec, molestie mi. Vivamus ligula massa, lobortis ac enim sit
              amet, facilisis ultrices mauris. Mauris rutrum risus a sapien
              convallis, vitae lacinia est tempus. Donec elit leo, tincidunt id
              pellentesque vitae, tincidunt vel diam. Donec rhoncus scelerisque
              tellus sed tempor. Fusce a elit sed tellus venenatis vulputate.
              Aliquam sit amet lectus at lacus cursus pharetra. Aenean lacinia
              nisi velit. Nullam pretium odio vitae sapien efficitur auctor.
              Maecenas suscipit urna id tellus efficitur pretium. Quisque eu
              ante arcu. Sed non leo et erat tempor pretium ut quis quam.
              Integer rhoncus dignissim nulla rhoncus dapibus. Sed viverra
              pretium congue. Donec tincidunt fermentum orci fringilla finibus.
              Aenean vitae arcu vel lacus tempus pulvinar ut vitae nunc.
              Suspendisse vel consectetur massa, non ullamcorper orci. Maecenas
              id dignissim justo. Sed ac euismod purus, id aliquet magna.
            </p>

            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              nec fringilla dolor. Vestibulum blandit luctus nisi a aliquet.
              Nulla fermentum arcu et nisl vulputate viverra. Proin viverra sit
              amet sapien faucibus maximus. Integer vel urna tempus, elementum
              erat nec, molestie mi. Vivamus ligula massa, lobortis ac enim sit
              amet, facilisis ultrices mauris. Mauris rutrum risus a sapien
              convallis, vitae lacinia est tempus. Donec elit leo, tincidunt id
              pellentesque vitae, tincidunt vel diam. Donec rhoncus scelerisque
              tellus sed tempor. Fusce a elit sed tellus venenatis vulputate.
              Aliquam sit amet lectus at lacus cursus pharetra. Aenean lacinia
              nisi velit. Nullam pretium odio vitae sapien efficitur auctor.
              Maecenas suscipit urna id tellus efficitur pretium. Quisque eu
              ante arcu. Sed non leo et erat tempor pretium ut quis quam.
              Integer rhoncus dignissim nulla rhoncus dapibus. Sed viverra
              pretium congue. Donec tincidunt fermentum orci fringilla finibus.
              Aenean vitae arcu vel lacus tempus pulvinar ut vitae nunc.
              Suspendisse vel consectetur massa, non ullamcorper orci. Maecenas
              id dignissim justo. Sed ac euismod purus, id aliquet magna.
            </p>

            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              nec fringilla dolor. Vestibulum blandit luctus nisi a aliquet.
              Nulla fermentum arcu et nisl vulputate viverra. Proin viverra sit
              amet sapien faucibus maximus. Integer vel urna tempus, elementum
              erat nec, molestie mi. Vivamus ligula massa, lobortis ac enim sit
              amet, facilisis ultrices mauris. Mauris rutrum risus a sapien
              convallis, vitae lacinia est tempus. Donec elit leo, tincidunt id
              pellentesque vitae, tincidunt vel diam. Donec rhoncus scelerisque
              tellus sed tempor. Fusce a elit sed tellus venenatis vulputate.
              Aliquam sit amet lectus at lacus cursus pharetra. Aenean lacinia
              nisi velit. Nullam pretium odio vitae sapien efficitur auctor.
              Maecenas suscipit urna id tellus efficitur pretium. Quisque eu
              ante arcu. Sed non leo et erat tempor pretium ut quis quam.
              Integer rhoncus dignissim nulla rhoncus dapibus. Sed viverra
              pretium congue. Donec tincidunt fermentum orci fringilla finibus.
              Aenean vitae arcu vel lacus tempus pulvinar ut vitae nunc.
              Suspendisse vel consectetur massa, non ullamcorper orci. Maecenas
              id dignissim justo. Sed ac euismod purus, id aliquet magna.
            </p>

            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              nec fringilla dolor. Vestibulum blandit luctus nisi a aliquet.
              Nulla fermentum arcu et nisl vulputate viverra. Proin viverra sit
              amet sapien faucibus maximus. Integer vel urna tempus, elementum
              erat nec, molestie mi. Vivamus ligula massa, lobortis ac enim sit
              amet, facilisis ultrices mauris. Mauris rutrum risus a sapien
              convallis, vitae lacinia est tempus. Donec elit leo, tincidunt id
              pellentesque vitae, tincidunt vel diam. Donec rhoncus scelerisque
              tellus sed tempor. Fusce a elit sed tellus venenatis vulputate.
              Aliquam sit amet lectus at lacus cursus pharetra. Aenean lacinia
              nisi velit. Nullam pretium odio vitae sapien efficitur auctor.
              Maecenas suscipit urna id tellus efficitur pretium. Quisque eu
              ante arcu. Sed non leo et erat tempor pretium ut quis quam.
              Integer rhoncus dignissim nulla rhoncus dapibus. Sed viverra
              pretium congue. Donec tincidunt fermentum orci fringilla finibus.
              Aenean vitae arcu vel lacus tempus pulvinar ut vitae nunc.
              Suspendisse vel consectetur massa, non ullamcorper orci. Maecenas
              id dignissim justo. Sed ac euismod purus, id aliquet magna.
            </p>

            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              nec fringilla dolor. Vestibulum blandit luctus nisi a aliquet.
              Nulla fermentum arcu et nisl vulputate viverra. Proin viverra sit
              amet sapien faucibus maximus. Integer vel urna tempus, elementum
              erat nec, molestie mi. Vivamus ligula massa, lobortis ac enim sit
              amet, facilisis ultrices mauris. Mauris rutrum risus a sapien
              convallis, vitae lacinia est tempus. Donec elit leo, tincidunt id
              pellentesque vitae, tincidunt vel diam. Donec rhoncus scelerisque
              tellus sed tempor. Fusce a elit sed tellus venenatis vulputate.
              Aliquam sit amet lectus at lacus cursus pharetra. Aenean lacinia
              nisi velit. Nullam pretium odio vitae sapien efficitur auctor.
              Maecenas suscipit urna id tellus efficitur pretium. Quisque eu
              ante arcu. Sed non leo et erat tempor pretium ut quis quam.
              Integer rhoncus dignissim nulla rhoncus dapibus. Sed viverra
              pretium congue. Donec tincidunt fermentum orci fringilla finibus.
              Aenean vitae arcu vel lacus tempus pulvinar ut vitae nunc.
              Suspendisse vel consectetur massa, non ullamcorper orci. Maecenas
              id dignissim justo. Sed ac euismod purus, id aliquet magna.
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

      <div
        className="flex items-center justify-center mt-8"
        onClick={() => navigate("/borrower/my-vaults")}
      >
        <Button variant="black">Continue to Markets</Button>
      </div>
    </>
  )
}

export default ServiceAgreement

import { Paper } from "../../../../components/ui-components/Paper"

import { Button } from "../../../../components/ui-components/Button"

function MasterLoanAgreement({
  nextStep,
}: {
  // eslint-disable-next-line react/require-default-props
  nextStep?: () => void
  // eslint-disable-next-line react/no-unused-prop-types,react/require-default-props
  previousStep?: () => void
}) {
  return (
    <>
      <Paper className="bg-white max-h-2xl flex flex-col border-0">
        <div className="overflow-scroll mt-5 pr-14 pl-8 flex-grow-1">
          <div className=" text-xs">
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
          <Button variant="green" className="w-40" onClick={nextStep}>
            Sign
          </Button>

          <Button variant="brown" className="w-40">
            Download
          </Button>
        </div>
      </Paper>

      <div className="flex items-center justify-center mt-8">
        <Button disabled variant="black" className="w-40">
          Continue to Vaults
        </Button>
      </div>
    </>
  )
}

export default MasterLoanAgreement

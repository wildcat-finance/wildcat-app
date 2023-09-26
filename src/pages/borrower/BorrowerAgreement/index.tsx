import cn from 'classnames'

import { Paper } from '../../../components/ui-components/Paper/index';
import { Button } from '../../../components/ui-components/Button/index';
import { ReactComponent as DownloadIcon } from '../../../images/icons/downloadIcon.svg';
import { ReactComponent as SignIcon } from '../../../images/icons/signIcon.svg';

const BorrowerAgreement = () => {
    const cssClassPaper = cn(
        `pt-5`,
        `pl-5`,
        `pb-5`,
        `pr-5`,
        `sm:pr-6`,
        `sm:pl-8`,
        `sm:pt-8`,
        `sm:pb-10`,
        `mb-8`
    );
    const cssClassContentWrapper = cn(
        `flex`,
        `flex-col`,
    );
    const cssClassText = cn(
        `text-xs`,
        `font-bold`,
        `mb-9`,
    );
    const cssClassTitle = cn(
        `text-green`,
        `text-2xl`,
        `font-black`,
        `mb-8`,
        `w-2/3`
    )
    const cssClassButtons = cn(
        `flex`,
        `self-center`,
        `gap-8`,
    )
    const cssClassButtonBlack = cn(
        `text-xs`,
        `font-bold-xs`,
        `pl-5`,
        `pr-5`,
        `sm:pr-6`,
        `sm:pl-8`,
        `flex`,
        `justify-center`
    )
    const cssClassButton = cn(
        `flex`,
        `text-xs`,
        `font-bold-xs`,
        `gap-3`,
    )

    return (
        <>
            <h2 className={cssClassTitle}>
                Wildcat Service Agreement
            </h2>
            <Paper className={cssClassPaper}>
                <div className={cssClassContentWrapper}>
                    <div className={cssClassText}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, esse. Inventore consequuntur ab molestias vero praesentium voluptate, quas minima. Ipsum at repellat a ut magni sapiente culpa minima cum rem qui, ipsa eveniet magnam velit tenetur labore voluptatum quaerat accusamus vel. Asperiores eligendi possimus laboriosam. <br /> Deleniti, provident voluptatum repellat sit atque similique itaque harum! Eum voluptas ut necessitatibus repellendus minus corrupti. Pariatur nemo cupiditate, perspiciatis ipsa voluptatum voluptas ex ipsam accusamus animi eaque in iusto magnam itaque soluta optio veniam praesentium, et iure! Vitae porro consequuntur harum reiciendis ipsa totam. In, aspernatur et! Iusto officiis, laudantium atque sit numquam deleniti quasi odit at illum sint impedit eligendi commodi quae doloribus temporibus praesentium veritatis fugit sunt itaque consequatur in maiores voluptatibus explicabo. <br /> Hic culpa suscipit, perspiciatis eaque similique repudiandae libero dignissimos eligendi aliquam aperiam dolore dolorem iure quis itaque obcaecati quae! Ducimus commodi saepe soluta, aperiam eius consequatur, fugit voluptas ut blanditiis, itaque tenetur! Blanditiis natus animi qui similique quidem illum corrupti cupiditate aut neque a expedita in, voluptate voluptatem. Veniam cupiditate quo expedita maiores repellat officiis, dolor enim incidunt, voluptatum officia doloribus corrupti consequuntur nisi, reiciendis omnis magnam atque architecto amet distinctio! Quaerat assumenda ab sit aperiam fuga fugiat eaque.
                    </div>
                    <div className={cssClassButtons}>
                        <Button className={cssClassButton} variant='blue'>
                            <span>Sign</span>
                            <SignIcon/>
                        </Button>

                        <Button className={cssClassButton} variant='gold'>
                            <span>Download</span>
                            <DownloadIcon/>
                        </Button>
                    </div>
                </div>
            </Paper>
            <div className={cssClassButtonBlack}>
                <Button variant='black'>
                    <span>Continue to Vaults</span>
                </Button>
            </div>
        </>
    );
}

export default BorrowerAgreement;
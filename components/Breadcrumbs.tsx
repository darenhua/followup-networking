import { Fragment } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Breadcrumbs({
    links,
}: {
    links: {
        label: string;
        href?: string;
    }[];
}) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {links.slice(0, -1).map((link, id) => (
                    <Fragment key={id}>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={link.href}>
                                {link.label}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </Fragment>
                ))}
                <BreadcrumbItem>
                    <BreadcrumbPage>
                        {links[links.length - 1].label}
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}

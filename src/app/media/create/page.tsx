import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {PackageType} from "../../../../generated/prisma/enums"

export default function CreateMedia() {

    const PackageTypesSelectOptions = Object.keys(PackageType) as Array<keyof typeof PackageType>
    const PackageTypesListItems = PackageTypesSelectOptions.map((pkgType) => <SelectItem value={pkgType}>{pkgType}</SelectItem>)
    console.log(PackageTypesListItems)

    return (
        <Card className="absolute md:end-200 w-full max-w-sm">
            <CardHeader>
                <CardTitle>Create new media item</CardTitle>
            </CardHeader>
            <CardContent>
                <form>
                    <Field>
                        <FieldLabel>Title</FieldLabel>
                        <Input id="media-title"/>
                    </Field>
                    <Field>
                        <FieldLabel>Rating</FieldLabel>
                        <Input type="number" id="media-rating" min="0" max="5"/>
                    </Field>
                    <Field>
                        <FieldLabel>Studio</FieldLabel>
                        <Input id="media-studio"/>
                    </Field>
                    <Field>
                        <FieldLabel>Release</FieldLabel>
                        <Input type="date" id="media-release"/>
                    </Field>
                    <Field>
                        <FieldLabel>Package Type</FieldLabel>
                        <Select>
                            <SelectTrigger className="w-full max-w-48">
                                <SelectValue placeholder="Select a package type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectLabel>Package Type</SelectLabel>
                                {PackageTypesListItems}
                                
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </Field>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
            </CardFooter>
        </Card>
    )
}
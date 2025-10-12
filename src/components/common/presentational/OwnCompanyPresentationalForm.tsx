import { ownCompanyFormSchema } from "@/lib/ownCompany/schema";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";

type OwnCompanyFormValues = z.infer<typeof ownCompanyFormSchema>;

interface OwnCompanyFormProps {
    form: ReturnType<typeof useForm<OwnCompanyFormValues>>;
}

const OwnCompanyPresentationalForm = ({ form, ref }: OwnCompanyFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = form;

    return (
        <div className="mt-10 relative">
            {form.formState.isSubmitting && (
                <div className="absolute inset-0 bg-background/50 z-10 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            )}
            <form>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="ownCompanyPersonInCharge">自社担当者</Label>
                        <Input
                            id="ownCompanyPersonInCharge"
                            placeholder="自社担当者"
                            {...register("ownCompanyPersonInCharge")}
                            disabled={form.formState.isSubmitting}
                        />
                        {errors.ownCompanyPersonInCharge && (
                            <p className="text-sm text-red-500">
                                {errors.ownCompanyPersonInCharge.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="ownCompanyDepartmentName">担当部署</Label>
                        <Input
                            id="ownCompanyDepartmentName"
                            placeholder="担当部署"
                            {...register("ownCompanyDepartmentName")}
                            disabled={form.formState.isSubmitting}
                        />
                        {errors.ownCompanyDepartmentName && (
                            <p className="text-sm text-red-500">
                                {errors.ownCompanyDepartmentName.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="externalLink">
                            外部リンク <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="externalLink"
                            {...register("externalLink")}
                            disabled={form.formState.isSubmitting}
                            required
                        />
                        {errors.externalLink && (
                            <p className="text-sm text-red-500">
                                {errors.externalLink.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <HoverCard>
                            <HoverCardTrigger asChild>
                                <div className="flex items-center space-x-2">
                                    <Controller
                                        name="isCancellation"
                                        control={control}
                                        render={({ field }) => (
                                            <Checkbox
                                                id="isCancellation"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        )}
                                    />
                                    <Label htmlFor="isCancellation">解除要項</Label>
                                </div>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-80">
                                <p className="text-sm">
                                    契約書の解約済みであるかを確認するフラグです。
                                </p>
                            </HoverCardContent>
                        </HoverCard>
                        {errors.isCancellation && (
                            <p className="text-sm text-red-500">
                                {errors.isCancellation.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="mt-6">
                    <Textarea
                        {...register("cancellationText")}
                        disabled={form.formState.isSubmitting}
                        rows={3}
                    />
                    {errors.cancellationText && (
                        <p className="text-sm text-red-500 mt-2">
                            {errors.cancellationText.message}
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
};

export default OwnCompanyPresentationalForm;

import Input from '@/components/atoms/form/Input';
import { poppins_400, poppins_500, poppins_600 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import React from 'react';
import { AddedResource } from '@/components/atoms/dashboard/subjects/AddedResource';
import AnnoucementUploadBox from '@/components/atoms/dashboard/announcement/AnnoucementUploadBox';
import { AnnouncementStaffCategoryDropdown } from '@/components/atoms/dashboard/announcement/AnnoucementStaffCategory';
import { ActivitiesOrEventsCategoryDropdown } from '@/components/atoms/dashboard/activities/ActivitiesOrEventCategoryDropdown';
import Button from '@/components/atoms/form/Button';

function Step1() {
    return (
        <div>
            <div className="mb-12 mt-6">
                <p className={cn('text-primary text-xs', poppins_600.className)}>Create Activity or Event</p>
                <h2 className={cn('text-xl text-gray1 mb-1 text-cente mt-3', poppins_500.className)}>
                    Input event or activity details to proceed
                </h2>

            </div>


            <div className="flex flex-col gap-6">
                <Input
                    id="annoucemen "
                    label="Annoucement title"
                    type="text"
                    labelClassName="label"
                    className="input h-14 rounded-lg"
                    name="text"
                    placeholder="Input resource name"
                // value={loginInfo.password}
                // handleChange={updateLoginInfo}
                />

                <div>

                    <ActivitiesOrEventsCategoryDropdown />
                </div>




                <div className="flex justify-between items-center border border-gray5 p-2 rounded-[66px]">
                    <div className="flex items-center gap-3">
                        <Button className="bg-gray4 rounded-full w-10 h-10 flex items-center justify-center border border-gray4">
                            {/* <UploadImageIcon /> */}upload
                        </Button>
                        <p className={cn('text-sm text-gray6', poppins_400.className)}>
                            {' '}
                            Upload subject cover image{' '}
                        </p>
                    </div>

                    <Button round className="bg-[#E8EBEA] h-[33px]">
                        {/* <Upload_Icon /> */}
                        <span className={cn('text-sm text-primary', poppins_400.className)}>
                            Upload
                        </span>
                    </Button>
                </div>

                <Input
                    id="description"
                    type='textarea'
                    label="Description"
                    labelClassName="label"
                    name="text"
                    placeholder="Input description"
                // value={loginInfo.password}
                // handleChange={updateLoginInfo}
                />

            </div>
        </div>





    );
}

export default Step1;

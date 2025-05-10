import Input from '@/components/atoms/form/Input';
import { poppins_400, poppins_500, poppins_600 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import React from 'react';
import { Label } from '@/components/ui/label';
import DropdownMultiSelect, { OptionType } from '@/components/atoms/form/DropdownMultiSelect';
import { RadioOptionType } from '@/components/atoms/form/RadioOptionType';
import { MultiValue } from 'react-select';
import { useEntity } from 'simpler-state';
import { selectedAnnouncementPreference, setSelectedAnnoncementPreference } from '@/app/lib/entities/annoucement.entity';
import { AnnouncementMediumDropdown } from '@/components/atoms/dashboard/announcement/AnnoucementMediumDropdown';
import { AnnouncementStaffCategoryDropdown } from '@/components/atoms/dashboard/announcement/AnnoucementStaffCategory';
import { selectedActivityPreference, setSelectedActivityPreference } from '@/app/lib/entities/activity.entity';
import Location from '@/components/atoms/icons/AuthTypeIcons/Location';
import { LocationDropdown } from '@/components/atoms/dashboard/activities/Location';



function Step2() {
    const selectedActivity = useEntity(selectedActivityPreference);
    const options = [
        { value: 'all', label: 'All' },
        { value: 'students', label: 'Students' },
        { value: 'staff', label: 'Staff' },
        { value: 'parents', label: 'Parents' },
    ];
    const classes = [
        { value: "jss1", label: "JSS1" },
        { value: "jss2", label: "JSS2" },
        { value: "jss3", label: "JSS3" },
        { value: "ss1", label: "SS1" },
        { value: "ss2", label: "SS2" },
        { value: "ss3", label: "SS3 " },
    ];
    const [selectedClass, setSelectedClass] = React.useState<MultiValue<OptionType>>([]);
    return (
        <div>
            <div className="mb-12 mt-6">
                <p className={cn('text-primary text-xs', poppins_600.className)}>Activity or Event preference</p>
                <h2 className={cn('text-xl --text-center text-gray1 mt-3', poppins_500.className)}>
                    Select announcement audience and end date
                </h2>
            </div>
            <div>
                <RadioOptionType options={options} selectedOption={selectedActivity} setSelectedOption={setSelectedActivityPreference} />
            </div>

            <div className='mt-8'>
                {selectedActivity === 'students' &&
                    <div>
                        <Label className={cn('text-base text-gray1 mb-2', poppins_400.className)}>
                            Select Class
                        </Label>
                        <DropdownMultiSelect options={classes} value={selectedClass} onChange={setSelectedClass} placeholder="Select classes..." />
                    </div>
                }

                {
                    selectedActivity === 'staff' &&

                    <div className='mt-6'>
                        <AnnouncementStaffCategoryDropdown />
                    </div>
                }
                <Input
                    id="Date"
                    label="Expires on (Optional)"
                    type="date"
                    labelClassName="label text-gray2 mt-6"
                    className=" h-11 rounded-lg"
                    name="text"
                    placeholder="Select date"
                // value={loginInfo.password}
                // handleChange={updateLoginInfo}
                />
                <div className=' mt-6'>
                    <LocationDropdown/>
                </div>


            </div>





        </div>
    );
}

export default Step2;



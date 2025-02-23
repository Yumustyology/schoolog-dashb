import { poppins_400, poppins_500 } from "@/app/lib/config/font.config";
import { cn } from "@/lib/utils";

export default function SchoolStats() {
    return (
        <section className='flex flex-col gap-6 w-full'>
            <div className='flex  items-center'>
                <div className='flex-1 '>
                    <h3 className={cn('text-sm text-black1 mb-1.5', poppins_500.className)}>
                        150
                    </h3>
                    <p className={cn('text-sm text-gray', poppins_400.className)}>
                        Total Students
                    </p>
                </div>

                <div>
                    <h3 className={cn('text-sm text-black1 items-end text-right mb-1.5', poppins_500.className)}>
                        90%
                    </h3>
                    <p className={cn('text-sm text-gray', poppins_400.className)}>
                        Average Performance
                    </p>
                </div>
            </div>

            <div className='flex items-center'>

                <div className='flex-1'>
                    <h3 className={cn('text-sm text-black1 mb-1.5', poppins_500.className)}>
                        80%
                    </h3>
                    <p className={cn('text-sm text-gray', poppins_400.className)}>
                        Teacher attendance
                    </p>
                </div>

                <div>
                    <h3 className={cn('text-sm text-black1 text-right mb-1.5', poppins_500.className)}>
                        90%
                    </h3>
                    <p className={cn('text-sm text-gray', poppins_400.className)}>
                        Student attendance
                    </p>
                </div>
            </div>

            <div className='flex justify-between items-center'>

                <div className='flex-1'>
                    <h3 className={cn('text-sm text-black1 mb-1.5', poppins_500.className)}>
                        52%
                    </h3>
                    <p className={cn('text-sm text-gray', poppins_400.className)}>
                        Curriculum Covered
                    </p>
                </div>

                <div>
                    <h3 className={cn('text-sm text-black1 text-right', poppins_500.className)}>
                        52
                    </h3>
                    <p className={cn('text-sm text-gray', poppins_400.className)}>
                        Resources
                    </p>
                </div>
            </div>
        </section>

    );
}

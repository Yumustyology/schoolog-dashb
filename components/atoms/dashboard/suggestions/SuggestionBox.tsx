import { SuggestionType } from '@/app/(pages)/(dashboards)/school/suggestions-box/page'
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config'
import { cn } from '@/app/lib/utils'
import React from 'react'
import SuggestionBoxDrawer from './SuggestionBoxDrawer'

const SuggestionBox = ({ suggestion, type }: { suggestion: SuggestionType, type?: "Admin" }) => {
    const [openSuggestionDrawer, setOpenSuggestionDrawer] = React.useState(false)


    
    const handleCloseDrawer = ()=>{
        setOpenSuggestionDrawer(false)
        console.log(openSuggestionDrawer)
    }
    return (
        <div
            className="flex flex-col gap-3 w-full border bg-[#fcfcfc] border-gray4 p-3.5 rounded-md cursor-pointer"
            onClick={()=>{setOpenSuggestionDrawer(true)}}
            
        >
            <h4 className={cn('text-black text-sm', poppins_500.className)}>
                {suggestion.title}{' '}
            </h4>
            <p className={cn('text-gray1 text-xs', poppins_400.className)}>
                {suggestion.content}{' '}
            </p>
            { type === 'Admin' &&

                <div>
                    <p className={cn('text-sm text-gray10', poppins_400.className)}>{suggestion.category}  <span className='text-[#E0E0E0]'> |</span> {suggestion.date}  </p> 
                </div>
            }
            <SuggestionBoxDrawer open={openSuggestionDrawer} closeDrawer={handleCloseDrawer}/>
        </div>
    )
}

export default SuggestionBox
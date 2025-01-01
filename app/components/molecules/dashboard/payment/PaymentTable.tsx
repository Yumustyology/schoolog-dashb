'use client'
import Dot from "@/app/components/atoms/dashboard/subjects/Dot";
import Button from "@/app/components/atoms/form/Button";
import DownloadIcon from "@/app/components/atoms/icons/dashboard/DownloadIcon";
import ScreenIcon from "@/app/components/atoms/icons/dashboard/ScreenIcon";
import ShowArrow from "@/app/components/atoms/icons/dashboard/ShowArrow";
import HideArrow from "@/app/components/atoms/icons/dashboard/SideBar/HideArrow";
import AcrobatPdfIcon from "@/app/components/atoms/icons/dashboard/materials/AcrobatPdfIcon";
import { Inter_400, Inter_500, Inter_600, poppins_400, poppins_500 } from "@/app/lib/config/font.config";
import { cn } from "@/lib/utils";
import { Card, Drawer, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { DrawerSide } from "../DrawerSide";

// Type for a single table description
type TableDescription = {
    id: number;
    class: string;
    term: string;
    date: string;
    time: string;
    number_of_subjects: number;
    open: boolean;
}

// Type for each row in the table
type TableRow = {
    paymentID: string;
    amount: string;
    paymentType: string;
    date: string;
    status: 'Success' | 'Pending' | 'Failed';
}


const TABLE_HEAD: string[] = ["Payment ID", "Amount", "Payment type", "Date", "Status", ""];

const TABLE_ROWS: TableRow[] = [
    {
        paymentID: 'Invoice #1838942022',
        amount: '64,000',
        paymentType: "School fees",
        date: '14/3/2024',
        status: 'Success'
    },
    {
        paymentID: 'Invoice #1838942022',
        amount: '64,000',
        paymentType: "School fees",
        date: '14/3/2024',
        status: 'Success'
    },
    {
        paymentID: 'Invoice #1838942022',
        amount: '64,000',
        paymentType: "School fees",
        date: '14/3/2024',
        status: 'Success'
    },
    {
        paymentID: 'Invoice #1838942022',
        amount: '64,000',
        paymentType: "School fees",
        date: '14/3/2024',
        status: 'Success'
    },
    {
        paymentID: 'Invoice #1838942022',
        amount: '64,000',
        paymentType: "School fees",
        date: '14/3/2024',
        status: 'Success'
    },
    {
        paymentID: 'Invoice #1838942022',
        amount: '64,000',
        paymentType: "School fees",
        date: '14/3/2024',
        status: 'Success'
    },

];

export function PaymentTable(): JSX.Element {

    return (
        <Card className="h-full w-full overflow-scroll p-3.5 mt-8">

            <div>
                <h3>Payments histories </h3>
            </div>



            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th key={head} className="bg-[#FBFBFB] p-4">
                                <Typography variant="small" className="font-normal text-gray1 leading-none opacity-70">
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {TABLE_ROWS.map(({ paymentID, date, paymentType, amount, status }, index) => {
                        const isLast = index === TABLE_ROWS.length - 1;
                        const classes = isLast ? "p-4" : "p-4 border-b border-gray4";

                        return (
                            <tr key={paymentID}>
                                <td className={classes}><Typography variant="small" className="font-normal text-gray1 flex items-center gap-3"> <AcrobatPdfIcon /> <span> {paymentID}</span></Typography></td>
                                <td className={classes}><Typography variant="small" className="font-normal text-gray1">{amount}</Typography></td>
                                <td className={classes}><Typography variant="small" className="font-normal text-gray1">{paymentType}</Typography></td>
                                <td className={classes}><Typography variant="small" className="font-normal text-gray1">{date}</Typography></td>

                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        className={cn(
                                            "font-normal rounded-full w-[92px] text-center px-4.5 py-1.5 ",
                                            status === "Success" ? "text-primary bg-primary1" :
                                                status === "Pending" ? "text-[#F2994A] bg-[#F2994A14]" :
                                                    status === "Failed" ? "text-[#EB5757] bg-[#EB575714]" :
                                                        "text-gray-600 bg-gray-200"
                                        )}
                                    >
                                        {status}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Button className={cn('bg-gray7 text-gray6 flex gap-3 text-sm', poppins_400.className)}>
                                        <DownloadIcon /> <span>Download file</span>
                                    </Button>
                                </td>


                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <DrawerSide title='Invoice #1838942022' subtitle="Transaction ID">
                <div className="p-6 overflow-y-auto max-h-[calc(100vh-140px)]" >

                    <div className="mt-6">
                        <div className="flex justify-between items-center">

                            <Typography>
                                <h2 className={cn('text-[16px] text-[#101828] mb-1.5', poppins_500.className)}>₦78,000</h2>
                                <p className="text-sm text-gray">Amount</p>
                            </Typography>

                            <Button round className="bg-[#ECFDF3] border border-[#ABEFC6] text-xs text-[#067647]"> Completed</Button>

                        </div>

                        <div className="bg-[#F8F8F8] border border-gray4 p-6 mt-10 rounded-xl w-full">
                            <header>

                            </header>

                            <div className={cn(' flex flex-col gap-4', poppins_400.className)}>
                                <div className="flex justify-between">
                                    <p className="text-sm text-gray6">
                                        Payment type
                                    </p>
                                    <p className="text-gray1">
                                        School fee
                                    </p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-sm text-gray6">
                                       Paid by
                                    </p>
                                    <p className="text-gray1">
                                        Muhammad Jamiu
                                    </p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-sm text-gray6">
                                        Date
                                    </p>
                                    <p className="text-gray1">
                                        11/12/2060
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="px-6 mt-6">
                    <Button round wide className="absolute bottom-3 bg-[#E9F8EF] left-0 right-0 w-full text-primary flex gap-3"> <DownloadIcon color="#21B55A"/> <span>Download file </span> </Button>
                </div>
            </DrawerSide>




        </Card>
    );
}

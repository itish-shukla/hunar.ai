import Image from "next/image";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import file from "@/public/file.svg"

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-white font-sans">
      {/* {file} */}

      <main className="flex flex-1 w-full flex-col items-center justify-between py-10 px-16 bg-white sm:items-start text-black">

        <span className="text-[28px] font-bold tracking-[-4%]">Redial & Guardrails</span>
        <div className="flex w-full justify-between">
          <div className="flex flex-col gap-10 w-1/2">
            <div className="bg-[#F4F4F5] px-6 pt-2.5 font-semibold rounded-[16px]">
              <span className="text-[14px]">Guardrails</span>
              <div className="bg-white p-6 mt-2.5 -mx-6 -mb-2.5 border-[#E4E4E7] border font-semibold rounded-[16px]">
                <div className="flex flex-col gap-3">
                  <span className="text-[14px]">Calling days</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}

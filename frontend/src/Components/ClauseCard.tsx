
import clsx from 'clsx';
import { AlertTriangle,} from 'lucide-react';


interface ResultData {
  clause: string;
  risk: string;
  risk_level: "low" | "medium" |"high";
  suggestion: string;
}


const ClauseCard = ({clause, risk, risk_level, suggestion}:ResultData ) => {

  const borderColorClass = clsx({
    'border-red-800': risk_level === 'high',
    'border-amber-400': risk_level === 'medium',
    'border-green-200': risk_level === 'low',
  })
  const IconColorClass = clsx({
    'text-red-800': risk_level === 'high',
    'text-amber-400': risk_level === 'medium',
    'text-green-200': risk_level === 'low',
  })


  return(
    <div className={clsx(`flex flex-col w-[90%] bg-[#0e0e10] rounded-lg pt-5  text-white border-dashed border-[1px]`, borderColorClass)}>
  <div className="flex flex-col w-[95%] gap-4 self-center p-6 bg-[#1f1f1f] rounded-lg">
    <div className="flex flex-row gap-4 items-start">
      <h1 className=" font-semibold text-gray-300">Clause:</h1>
      <p className="text-[20px] italic leading-relaxed text-gray-200">
        {clause}
      </p>
    </div>
    <div className="flex flex-row gap-4 items-start">
      <h1 className="text-base font-semibold text-gray-300">Risk:</h1>
      <p className="text-[20px] font-normal leading-relaxed text-gray-200">
        {risk}
      </p>
    </div>
    <div className="flex flex-row gap-4 items-start">
      <h1 className="text-base font-semibold text-gray-300">Suggestion:</h1>
      <p className="text-[20px] font-normal leading-relaxed text-gray-200">
        {suggestion}
      </p>
    </div>
  </div>
  <div className="flex flex-row gap-2 items-center px-6 py-4 justify-center text-gray-300">
    <h1 className="text-base font-semibold">Risk Level:</h1>
    <p className="text-base font-medium text-white">{risk_level}</p>
    <AlertTriangle className={clsx("w-5 h-5 ", IconColorClass)}/>

  </div>
</div>

  )
}

export default ClauseCard
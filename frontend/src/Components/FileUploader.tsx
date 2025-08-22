import  {useState} from 'react'
import ClauseCard from './ClauseCard'
import { Upload, FileText, Brain, } from 'lucide-react';

interface ResultData {
  clause: string;
  risk: string;
  risk_level: "low" | "medium" |"high";
  suggestion: string;
}


const FileUploader = () => {

    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [suggestion, setSuggestion] = useState<string[] | null> (null)
    const [clauses, setClauses] = useState<ResultData[] | null> ( null)

    const handleUpload = async () => {

      try {
        if(!file) return
        setLoading(true)
        const formdata = new FormData()
        formdata.append("contract", file)

        //uploading the file to the backend here
        const res = await fetch("http://localhost:8080/api/upload", {
            method: "POST",
            body: formdata,
        })
        const data = await res.json()



        //analyzing the uploaded file
         const res2 = await fetch("http://localhost:8080/api/analyzer", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: data.text })
          });

          const finRes = await res2.json()

          //converting the json file to a string and then again to a standard js object           
          const rawRes = finRes.result as string
          const clean = rawRes.replace(/^```json\s*|\s*```$/g, "")
          const parsedCleanres = JSON.parse(clean)

          //setting all the results to all the states
          setClauses(parsedCleanres.contract_analysis.clauses)
          setSuggestion(parsedCleanres.contract_analysis.general_suggestions)



          setLoading(false)
          setError(null)

      } catch (err: any) {
        setError(err?.message || String(err))
      } finally{
        setLoading(false)
      }

    }




  return (
    <div className='w-full min-h-full flex flex-col bg-[#0c0c0c] gap-6 pb-10 justify-center items-center pt-[30px]'>
      { !clauses && !suggestion && <div className='flex flex-col justify-center items-center rounded-2xl bg-[#222426] min-w-[400px] px-7 max-w-[600px] p-5'>
          <div >
        {file ? (
                <div className="flex flex-col items-center justify-center bg-gray-950 border-dashed border-2 border-spacing-2 w-[500px] border-green-600 p-5 rounded-2xl">
                  <FileText className="w-12 h-12 text-white mr-4" />
                  <div className="text-center ">
                    <p className="text-lg font-semibold text-white">{file.name}</p>
                    <p className="text-green-600">Ready to analyze</p>
                  </div>
                </div>
              ) : (
                <div className='flex flex-col items-center justify-center bg-gray-950 border-dashed border-2 border-spacing-2 w-[500px]  p-5 rounded-2xl'>
                  <Upload className="w-16 h-16 text-white mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">Supported for standard unflattened PDF, docx and txt </p>
                  <input
                    type="file"
                    accept=".pdf, .docx, .txt"
                    onChange={(e) => {
                      if(e.target.files) setFile(e.target.files[0]);
                    }}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose File
                  </label>
                </div>
              )}
              </div>
              {file && !loading && (
              <div className="text-center  mt-6">
                <button
                  onClick={() =>{handleUpload();}}
                  className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  <Brain className="w-5 h-5 mr-2" />
                  Analyze Contract
                </button>
              </div>
            )}
            </div>}


              
       
              
        <div className='w-full relative flex flex-col h-full items-center gap-y-3 justify-center'>
          

          {loading && 
          <div className='flex gap-3 items-center justify-center'>
            <span className="loading loading-spinner text-white "></span>
            <p className='text-white font-extralight text-lg'>Analyzing...</p>
          </div>
          }

          {error && !loading && <div>
              <p className='text-white font-medium text-2xl'>Opps there seems to be some error try again without refreshing</p>
            </div>}

           {clauses && !loading &&
              <div className="flex flex-col items-center gap-5">
                <div className="flex items-center justify-between gap-3 bg-gray-800 max-w-[600px] rounded-xl p-4 shadow-sm">
                  <div className="flex items-center">
                    <FileText className="w-10 h-10 text-white mr-2" />
                    <span className="font-medium text-white">{file?.name}</span>
                  </div>
            
                    <button
                      onClick={() => {
                        setFile(null);
                        setClauses(null);
                        setSuggestion(null)
                      }}
                      className="px-4 py-2 text-black bg-white hover:text-white hover:bg-gray-400 rounded-lg transition-colors">
                      Analyze New Contract
                    </button>
                    
                </div>
                <div className='w-full flex flex-col items-center justify-center gap-8'>
                  <h1 className='text-2xl'>Risky Clauses Found ({clauses.length})</h1>
                  {clauses.map((clauses : ResultData, index: number )=> {return(<ClauseCard key={index} {...clauses}/>) })}
                </div>
              </div>
            }


        </div>{ suggestion && !loading &&
        <div className='w-full flex flex-col items-center justify-center gap-3'>
          <h1 className='text-2xl font-medium text-white'>Imporvement Suggestions</h1>
        <div className='flex flex-col w-[80%] bg-gray-900 rounded-[10px] justify-center items-start  p-5 gap-2'>
            {suggestion && suggestion.map((suggestions: string, index:number )=>{ 
              return(
              <div key={index} className='w-full flex flex-col justify-center gap'>
                  <div className='text-[20px] max-w-[full] font-white'> {suggestions} </div>
              </div>
            )
              })}
        </div>
        </div>
}
    </div>
  )
}

export default FileUploader



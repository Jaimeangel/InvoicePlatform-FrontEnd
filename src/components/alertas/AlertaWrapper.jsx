//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

function AlertaWrapper({
    children,
    alert,
    close=false
}) {
        
    const {
        msg,
        error
    }=alert;

    return (
        <div className="flex flex-col">
            {
                error &&
                <div className={`${error ?'bg-red-100 border border-red-600':'bg-blue-100 border border-blue-600'} w-full flex flex-row justify-between rounded-md mt-3 border-2`}>
                    <div className={`${error ?'bg-red-600':'bg-blue-600'} px-4`}>
                        {
                            error ? <FontAwesomeIcon icon={faTriangleExclamation} style={{color: "#ffffff",}} /> : <FontAwesomeIcon icon={faFlag} style={{color: "#ffffff",}} />
                        }
                    </div>
                    <div className="w-full my-auto">
                        <p className=" tracking-wider text-black text-center text-base font-semibold italic">{msg}</p>
                    </div>
                    { close && (
                        <div className={`${error ?'bg-red-600':'bg-blue-500'} px-4`}>
                            <FontAwesomeIcon icon={faCircleXmark} style={{color: "#ffffff",}} />
                        </div>
                    )

                    }
                </div>
            }
            {children}
        </div>
    )
}

export default AlertaWrapper

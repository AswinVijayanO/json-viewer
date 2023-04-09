import { useEffect, useState } from "react"

const JsonVisual = ({ object, name }) => {
    // const [minimize, setMinimize] = useState(false)
    const onCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(object));
    }



    return (
        object ?
            <table className="node">
                <tr>
                    {name && <td className={"name"}>{name}</td>}
                    <td>
                        <button className="button" onClick={onCopy}>
                            <img src={"src/assets/copy.png"} height={12} width={12} />copy
                        </button>
                    </td>
                    <td>
                        {/* <button className="button" onClick={() => { setMinimize(t=> !t) }}>{minimize ? "Maximize" : "Minimize"} this </button> */}
                    </td>

                </tr>



                {Object.keys(object).map(key => {
                    if (typeof object[key] === 'string') {
                        return (
                            <tr className="key" key={key}>
                                {!object.length && <td>{key}:</td>}<td className="value" title={object[key]}>"{object[key]}"</td>
                            </tr>
                        )
                    } else if (typeof object[key] === 'number') {
                        return (
                            <tr className="key" key={key}>
                                {!object.length && <td>{key}:</td>}<td className="value">{object[key]}</td>
                            </tr>
                        )
                    } else if (typeof object[key] === 'boolean') {
                        return (
                            <tr className="key" key={key}>
                                {!object.length && <td>{key}:</td>}<td className="value">
                                    <input type={"checkbox"} checked={object[key]} />
                                </td>
                            </tr>
                        )
                    } else {
                        return JsonVisual({ object: object[key], name: key })
                    }
                })
                }


            </table>
            : <></>
    )
}
export default JsonVisual
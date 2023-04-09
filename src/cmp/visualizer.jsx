import { useEffect, useState } from "react"
import { SteppedLineTo } from 'react-lineto';
const JsonVisual = ({ object, name, parent, level = 0, tree = false }) => {
    // const [minimize, setMinimize] = useState(false)
    const onCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(object));
    }
    const nestedObjects = object ? Object.keys(object).filter(key => typeof object[key] === 'object') : []


    return (
        object ?
            <>
                <table className={`node level-${level} tree-${name}`}
                    style={tree ? { position: 'relative', left: `${((level * 100) + 10)}px` } : {}}
                >

                    <tr>
                        <p className={`node-${name} from-parent`}>

                        </p>
                    </tr>
                    <tr>
                        {name && <td className={"name"}>{name}</td>}

                        <td>
                            <span>
                                
                                <button className="button" onClick={onCopy}>
                                    <img src={"src/assets/copy.png"} height={12} width={12} />copy{object.length ? " Array" : " Object"}
                                </button>
                            </span>


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
                        } else if (!tree) {
                            return JsonVisual({ object: object[key], name: key, parent: name, level: level + 1 })
                        }
                    })
                    }

                    <tr>
                        <p className={`parent-${name} to-child`}> </p>
                    </tr>
                </table>
                {
                    tree && nestedObjects.map(key => {
                        return JsonVisual({ object: object[key], name: key, parent: name, level: level + 1 })
                    })
                }

            </>
            : <></>
    )
}
export default JsonVisual
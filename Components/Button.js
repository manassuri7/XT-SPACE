export default function Button(props) {
    return (
        <React.Fragment>
            <input type={"submit"} className={props.className} value={props.value} onClick={props.onClick}/>
        </React.Fragment>
    )
}
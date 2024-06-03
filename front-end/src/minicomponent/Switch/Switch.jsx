import './switch.css'
export const Switch = ({ isChecked, handleCheck }) => {
    handleCheck = () => {
        handleCheck()
    }
    return (
        <label className="switch">
            <input type="checkbox" value={isChecked} />
            <span className="slider"></span>
        </label>
    )
}

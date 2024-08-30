import "../styles/components/MessageBox.style.scss"

const MessageBox = ({children} : {children: React.ReactNode}) => {
    return (
        <div className="message-container">
            <p>{children}</p>
        </div>
    )
}

// H@jru1ha
// hajrul

export default MessageBox


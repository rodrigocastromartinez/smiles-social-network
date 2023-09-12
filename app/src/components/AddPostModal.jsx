import { createPost } from '../logic/createPost'
import { useAppContext } from '../hooks'

export default function AddPostModal({ onCancel, onPostCreated }) {
    const { freeze, unfreeze } = useAppContext()

    function handleCancel(event) {
        event.preventDefault()

        onCancel()
    }

    async function handleCreatePost(event) {
        event.preventDefault()

        const image = event.target.url.value,
            text = event.target.text.value

        try {
            freeze()

            await createPost(image, text)
                
            unfreeze()

            onPostCreated()
        } catch (error) {
            unfreeze()
            
            alert(error.message)
        }
    }

    return <section className="modal-window" name="modal-new-post">
        <form className="form-new-post" action="" onSubmit={handleCreatePost}>
            <input className="input-field" type="url" name="url" placeholder="Insert image url" />
            <textarea name="text" cols="30" rows="10" className="post-text input-field" placeholder="Insert caption"></textarea>
            <div className="buttons">
                <button className="submit-buttons submit-post" type="submit">Post</button>
                <button className="submit-buttons cancel-post" type="button" onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    </section>
}
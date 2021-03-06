import React from 'react'

// import { postImage } from '../func/methods'
import { linkServer } from '../keys'
import './style.css'


// function dataURLtoFile(dataurl, filename) {
// 	let arr = dataurl.split(',')
// 	let mime = arr[0].match(/:(.*?);/)[1]
// 	let bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)

// 	while (n--) {
// 		u8arr[n] = bstr.charCodeAt(n)
// 	}

// 	return new File([u8arr], filename, {type:mime})
// }

export default class Add extends React.Component {
	// constructor(props) {
	// 	super(props)
	// 	this.state = {file: '', imagePreviewUrl: ''}
	// }

	render() {
		// let {imagePreviewUrl} = this.state
		// let $imagePreview = null
		// if (imagePreviewUrl) {
		// 	$imagePreview = (<img src={imagePreviewUrl} />)
		// } else {
		// 	$imagePreview = (<div className="previewText">Please select an Image for Preview</div>)
		// }

		return (
			<div>
				<div id="comp">
					<label htmlFor="avatar">Добавить</label>
					<input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" onChange={ (res)=>this.requestImage(res) }></input>
				</div>
				{
				// <div className="imgPreview">
				// 	{ $imagePreview }
				// </div>
				}
			</div>
		)
	}

	requestImage = (res) => {
		res.preventDefault();

		let reader = new FileReader()
		let file = res.target.files[0]

		reader.onloadend = () => {
			// console.log(reader.result)
			// const fil = dataURLtoFile(reader.result, 're.jpg')

			const data = new FormData();
			data.append('file', file);
			// data.append('filename', this.fileName.value);

			fetch(linkServer, {
				method: 'POST',
				body: data,
			}).then((response) => {
				response.json().then((body) => {
					alert(body.category)
					this.setState({ imageURL: `{ linkServer }${ body.file }` });
				});
			});

			// postImage(this, reader.result)

			// this.setState({
			// 	file: file,
			// 	imagePreviewUrl: reader.result,
			// })
		}

		reader.readAsDataURL(file)
	}
}

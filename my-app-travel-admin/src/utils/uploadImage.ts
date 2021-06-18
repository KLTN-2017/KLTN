const uploadImage = (file: File) => {
  const data = new FormData()
  data.append('file', file)
}

export default uploadImage

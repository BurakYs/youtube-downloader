const options = document.querySelector('.options');
const videoUrl = document.querySelector('#video-url');
const formatSelect = document.querySelector('#format');
const downloadBtn = document.querySelector('#download-btn');
const quality = document.querySelector('#quality')
downloadBtn.addEventListener('click', () => {
    const url = videoUrl.value;
    const format = formatSelect.value;
    console.log(format)
    window.location.href = `/api/download/?url=${url}&format=${format}&quality=${quality.value}`;
});
enum FacingMode {
  Front = "front",
  Back = "back"
}

export default class CameraManager {

  #video: HTMLVideoElement

  constructor() {
    this.#video = document.createElement("video")
    this.#video.setAttribute('autoplay', '');
    this.#video.setAttribute('muted', '');
    this.#video.setAttribute('playsinline', '')
  }

  /**
   * Gets camera stream from the device and sets it as the video source.
   * This function ensure that the image frames of the camera video is ready to be extracted.
   */
  async start() {
    const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          // On the mobile device, it means that the front camera is preferred
          facingMode: "user",
        }
    });
    this.#video.srcObject = stream;
    return new Promise<void>(async (resolve) => {
      this.#video.onloadedmetadata = () => {
        this.#video.play()
        resolve()
      }
    })
  }

  getVideo() {
    return this.#video
  }
}
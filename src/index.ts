import Stats from "stats.js"
import { VideoRenderer } from "./VideoRenderer"
import { RainRenderer } from "./RainRenderer"
import CameraManager from "./CameraManager"
import { CloudRenderer } from "./CloudRenderer"

const stats = new Stats()
document.body.appendChild(stats.dom)

main()

async function main() {

  const rainRenderer = new RainRenderer()
  const videoRenderer = new VideoRenderer()
  const cloudRenderer = new CloudRenderer()
  cloudRenderer.setUp()

  const mainCanvas = document.createElement("canvas")
  const mainContext = mainCanvas.getContext("2d")!
  mainCanvas.style.height = "100vh"
  mainCanvas.style.width = "100vw"
  document.querySelector(".container")!.appendChild(mainCanvas)

  const cameraCanvas = document.createElement("canvas")
  const cameraContext = cameraCanvas.getContext("2d")!

  const cameraManager = new CameraManager()
  await cameraManager.start()
  const cameraVideo = cameraManager.getVideo()
  const vw = cameraVideo.videoWidth
  const vh = cameraVideo.videoHeight
  mainCanvas.width = vw
  mainCanvas.height = vh
  mainCanvas.style.maxHeight = `calc(100vw * ${vh / vw})`
  mainCanvas.style.maxWidth = `calc(100vh * ${vw / vh})`

  cameraCanvas.width = vw
  cameraCanvas.height = vh
  videoRenderer.setSize(vw, vh)
  rainRenderer.setSize(vw, vh)
  cloudRenderer.setSize(vw, vh)

  process()

  async function process () {
    stats.begin()
    cameraContext.clearRect(0, 0, cameraCanvas.width, cameraCanvas.height)
    cameraContext.drawImage(cameraVideo, 0, 0, cameraCanvas.width, cameraCanvas.height)

    videoRenderer.process(cameraCanvas)
    rainRenderer.process()
    cloudRenderer.render()

    mainContext.drawImage(videoRenderer.getCanvas(), 0, 0, mainCanvas.width, mainCanvas.height)
    mainContext.drawImage(rainRenderer.getCanvas(), 0, 0, mainCanvas.width, mainCanvas.height)
    mainContext.drawImage(cloudRenderer.getCanvas(), 0, 0, mainCanvas.width, mainCanvas.height)

    stats.end()
    requestAnimationFrame(process)
  }
}
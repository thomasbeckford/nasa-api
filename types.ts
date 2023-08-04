import { Camera, Rover } from './enums'

export interface Photo {
  id: number
  sol: string
  camera: {
    id: number
    name: string
    rover_id: number
    full_name: string
  }
  img_src: string
  earth_date: string
  rover: {
    total_photos: number
    id: number
    name: string
    landing_date: string
    launch_date: string
    status: string
  }
}

export type FormDataType = {
  rover: Rover
  sol: string | null
  earthDate: string | null
  camera: Camera | null
}

export type SearchValuesType = {
  id: string
} & FormDataType

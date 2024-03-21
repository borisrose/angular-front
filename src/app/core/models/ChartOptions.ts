import { Olympic } from "./Olympic"
import { SeriesElement } from "./SeriesElement"

export interface ChartOptions {
    data:Array<Olympic>
    series:Array<SeriesElement | any>
}
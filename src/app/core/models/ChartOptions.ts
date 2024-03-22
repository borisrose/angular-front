import { CountryMedals } from "./CountryMedals"
import { LineFormattedData } from "./LineFormattedData"
import { Olympic } from "./Olympic"
import { SeriesLineElement, SeriesPieElement } from "./SeriesElement"

export interface ChartOptions {
    data?:Array<CountryMedals | LineFormattedData>
    series:Array<SeriesPieElement | SeriesLineElement | any>
    axes?:Array<any>
}
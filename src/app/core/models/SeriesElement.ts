export interface SeriesPieElement {
    type:string;
    angleKey:string;
    calloutLabelyKey:string;
    sectorLabel: {
        color:string,
        fontWeight:string
    }
    tooltip: {
        rendered:Function
        interaction: {
            enabled:boolean
        }
    }
}

export interface SeriesLineElement {
    type:string,
    xKey:string,
    yKey:string
}


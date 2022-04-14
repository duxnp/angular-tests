export class Property {
  constructor(
    public imageUrl: string,
    public imageAlt: string,
    public beds: number,
    public baths: number,
    public title: string,
    public priceInCents: number,
    public formattedPrice: string,
    public reviewCount: number,
    public rating: number
  ) { }
}
export const Distributor = ({distributor, flowers, nurseryFlowers, distributorNursery, retailers}) => {

    //filter the distributorNursery by distributor id
    const filteredDistributorNurseries = distributorNursery.filter(dn => dn.distributorId === distributor.id)

    return (
        <div className="distributor" key={distributor.id}>
            <div className="distributor-name">{distributor.name}</div>
            <div className="distributor-flowers">
                <b>Flowers</b>
                {filteredDistributorNurseries.map(dn => {
                    console.table(dn)
                    //filter the nurseryFlowers by nursery id
                    const filteredNurseryFlowers = nurseryFlowers.filter(nf => nf.nurseryId === dn.id)
                    return filteredNurseryFlowers.map(nf => {
                        //filter the flowers by flower id
                        const filteredFlowers = flowers.filter(flower => flower.id === nf.flowerId)
                        const markupPrice = parseFloat(nf.price) + distributor.markup
                        return filteredFlowers.map(flower => {
                            return (
                                <div className="distributor-flower" key={flower.id}>
                                    {flower.color + " " + flower.species + " $" + parseFloat(markupPrice).toFixed(2) }
                                </div>
                            )
                        })

                    })

                })}
            </div>
            <div className="distributor-retailers">
                <b>Retailers</b>
                {retailers.map(retailerObject => {
                if(retailerObject.distributorId === distributor.id){
                    return <div className="distributor-retailer" key={retailerObject.id}>{retailerObject.name}</div>
                }
            })}
            </div>
        </div>
    )

}


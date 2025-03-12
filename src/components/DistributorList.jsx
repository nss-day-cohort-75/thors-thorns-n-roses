import { useEffect, useState } from "react"
import { getDistributors, getNurseryDistributors } from "../services/DistributorService"
import { getFlowers, getNurseryFlowers } from "../services/FlowerService"
import { Distributor } from "./Distributors"
import { getRetailers } from "../services/RetailerService"
import "./Distributor.css"

export const DistributorList = () => {
    const [distributors, setDistributors] = useState([])
    const [flowers, setFlowers] = useState([])
    const [retailers, setRetailers] = useState([])
    const [distributorNursery, setDistributorNursery] = useState([])
    const [nurseryFlowers, setNurseryFlowers] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            //fetch the data for Distributor component
            const distributorData = await getDistributors()
            const flowerData = await getFlowers()
            const retailerData = await getRetailers()
            const nurseryDistributorData = await getNurseryDistributors()
            const nurseryFlowerData = await getNurseryFlowers()

            //set data for Distributor component
            setDistributors(distributorData)
            setFlowers(flowerData)
            setRetailers(retailerData)
            setDistributorNursery(nurseryDistributorData)
            setNurseryFlowers(nurseryFlowerData)
        }
        fetchData()
    }, [])

    return (
        <div>
            <div className="distributors-title">
                <h2>Distributors</h2>
            </div>
            <div className="distributors-body">
                <ul className="distributors">
                {distributors.map(distributorObject => {
                        return <Distributor distributor={distributorObject} nurseryFlowers={nurseryFlowers} distributorNursery={distributorNursery} flowers={flowers} retailers={retailers} key={distributorObject.id}/>
                    })}
                </ul>
            </div>
        </div>
    )
}
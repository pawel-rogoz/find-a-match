import { Route, Routes } from "react-router-dom"
import MatchList from "./MatchList"
import Match from "./Match"
import MatchMap from "./MatchMap"

function MatchRoutes () {
    return (
        <Routes>
          <Route index element={<MatchList />} />
          <Route path=":id" element={<Match />} />
          <Route path="map" element={<MatchMap />} />
        </Routes>
    )
}

export default MatchRoutes
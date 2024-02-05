import { Route, Routes } from "react-router-dom"
import MatchList from "./MatchList"
import Match from "./Match"
import MatchMap from "./MatchMap"

function MatchRoutes ({ userData }) {
    return (
        <Routes>
          <Route index element={<MatchList />} />
          <Route path=":matchId" element={<Match userData={userData} />} />
          <Route path="map" element={<MatchMap />} />
        </Routes>
    )
}

export default MatchRoutes
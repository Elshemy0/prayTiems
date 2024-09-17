let arr: number[] = [1, 2, 3, 4, 5]
import "./loader.css"
export default function loader() {
    return (
        <div className="prayCards" style={{ padding: "20px", display: "flex", alignItems: "center", flexWrap: "wrap", gap: "20px", marginTop: "30px", justifyContent: "center" }}>
            {arr.map((item: number) => {
                return (
                    <div key={item} style={{ borderRadius: "5px", display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "var(--accent)" }}>
                        <div className="prayAnim" style={{ width: "300px", height: "200px", backgroundColor: "#c0c0c0" }} />
                        <div className="prayInfo" style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", direction: "rtl", padding: "15px" }}>
                            <div className="prayAnim" style={{ color: "var(--text)", width: "30%", backgroundColor: "#c0c0c0", height: "40px", borderRadius: "50px" }}></div>
                            <div className="prayAnim" style={{ color: "var(--text)", width: "30%", backgroundColor: "#c0c0c0", height: "40px", borderRadius: "50px" }}></div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

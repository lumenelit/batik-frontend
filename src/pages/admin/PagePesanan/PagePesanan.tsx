import React, { useEffect, useState } from "react";
import Container from "../../../components/layouts/Container";
import Header from "../../../components/layouts/Header";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function PagePesanan() {
    const [products, setProducts] = useState([]);
    const columns = [
        { field: "no", header: "No" },
        { field: "name", header: "Nama Industri" },
        { field: "owner", header: "Nama Pemilik" },
        { field: "contact", header: "Kontak" },
        { field: "address", header: "Alamat" }
    ];

    const data = [
        {
            no: 1,
            name: "Industri Batik Sulawesi Utara",
            owner: "Budi",
            contact: "081234567890",
            address: "Jl. Sulawesi No. 1"
        },
        {
            no: 2,
            name: "Industri Batik Sulawesi Utara",
            owner: "Budi",
            contact: "081234567890",
            address: "Jl. Sulawesi No. 1"
        },
        {
            no: 3,
            name: "Industri Batik Sulawesi Utara",
            owner: "Budi",
            contact: "081234567890",
            address: "Jl. Sulawesi No. 1"
        },
        {
            no: 4,
            name: "Industri Batik Sulawesi Utara",
            owner: "Budi",
            contact: "081234567890",
            address: "Jl. Sulawesi No. 1"
        },
        {
            no: 5,
            name: "Industri Batik Sulawesi Utara",
            owner: "Budi",
            contact: "081234567890",
            address: "Jl. Sulawesi No. 1"
        }
    ];

    useEffect(() => {
        setProducts(data);
    }, []);

    return (
        <Container center>
            <Header admin />
            <h1 className="text-xl font-semibold text-dark">Daftar Pesanan</h1>
            <DataTable
                value={products}
                tableStyle={{ minWidth: "50rem" }}
                className="overflow-hidden shadow-primary rounded-xl text-dark"
            >
                {columns.map((col, i) => (
                    <Column
                        key={col.field}
                        field={col.field}
                        header={col.header}
                    />
                ))}
            </DataTable>
        </Container>
    );
}

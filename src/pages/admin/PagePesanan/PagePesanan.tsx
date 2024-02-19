import React, { useEffect, useState } from "react";

import Container from "../../../components/layouts/Container";
import Header from "../../../components/layouts/Header";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import api from "../../../config/api";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Checkbox } from "primereact/checkbox";
import { get } from "http";

function formatRupiah(int) {
    let rupiah = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    }).format(int);
    return rupiah.split(",")[0]; // remove the decimal part
}

export default function PagePesanan() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [image, setImage] = useState([]);

    const getPesanan = async () => {
        try {
            const res = await api.get("/pesanan");
            setProducts(res.data.data);
            console.log(res.data.data);
            const select = findDoneData(res.data.data);
            console.log(select);
            setSelectedProducts(select);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        products.forEach(async (product) => {
            if (product.idMotif) {
                const img = await getImage(product.idMotif);
                setImage((prevImage) => [
                    ...prevImage,
                    { img: img, id: product.idMotif }
                ]);
            } else {
                setImage((prevImage) => [...prevImage, null]);
            }
        });
    }, [products]);

    console.log("image", image);
    const handleCheckboxChange = async (e) => {
        const product = e[0];
        console.log("before hit", product.isDone);

        try {
            const updatedProduct = {
                ...product,
                isDone: !product.isDone
            };

            const res = await api.patch(
                `/pesanan/${product._id}`,
                updatedProduct
            );

            console.log("after hit", res.data.data.isDone);
            getPesanan();
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getPesanan();
    }, []);

    //create function to find missing data from 2 array
    const findMissingData = (arr1, arr2) => {
        const missing = [];

        if (!arr1 || !arr2) {
            return missing;
        }

        // Convert both arrays to Sets for efficient membership testing
        const set1 = new Set(arr1);
        const set2 = new Set(arr2);

        // Find elements in arr1 but not in arr2
        arr1.forEach((element) => {
            if (!set2.has(element)) {
                missing.push(element);
            }
        });

        // Find elements in arr2 but not in arr1
        arr2.forEach((element) => {
            if (!set1.has(element)) {
                missing.push(element);
            }
        });

        return missing;
    };

    //function to extract data that isDone === true from an array
    const findDoneData = (arr) => {
        const done = [];
        // console.log(arr);
        //if arr not array then put it inside array first
        if (!Array.isArray(arr)) {
            arr = [arr];
        }

        arr.forEach((element) => {
            if (element.isDone) {
                done.push(element);
            }
        });
        // console.log("done", done);
        return done;
    };

    const getImage = async (idMotif) => {
        try {
            const res = await api.get(`/motif/image/${idMotif}`);
            return res.data.data[0].image1;
        } catch (error) {
            console.log(error);
        }
    };

    const showImage = (rowData) => {
        const idMotif = rowData.idMotif;

        return (
            <img
                src={"https://via.placeholder.com/150"}
                alt="motif"
                width="100%"
                height="100%"
            />
        );
    };

    return (
        <Container center>
            <Header admin />
            <h1 className="text-xl font-semibold text-dark">
                {t("orderList")}
            </h1>
            <DataTable
                value={products}
                tableStyle={{ minWidth: "50rem" }}
                className="overflow-hidden shadow-primary rounded-xl text-dark"
                // onRowClick={(e) => {
                //     navigate(`/invoice/${e.data._id}`);
                // }}
                selection={selectedProducts}
                onSelectionChange={(e) => {
                    // console.log("click", e.value);
                    handleCheckboxChange(
                        findMissingData(e.value, selectedProducts)
                    );
                    // console.log(selectedProducts);
                }}
                // pt={{ bodyRow: { className: "cursor-pointer" } }}
                stripedRows
            >
                <Column
                    header="Done"
                    selectionMode="multiple"
                    headerStyle={{ width: "3rem" }}
                    pt={{
                        checkbox: { className: "border-2 border-gray-400" },
                        checkboxWrapper: { className: "bg-gray-100" }
                    }}
                ></Column>
                <Column
                    field="createdAt"
                    header={t("date")}
                    body={(rowData) => {
                        const date = new Date(rowData.createdAt);
                        const day = date.getDate();
                        const month = date.getMonth();
                        const year = date.getFullYear();

                        const monthNames = [
                            t("Januari"),
                            t("Februari"),
                            t("Maret"),
                            t("April"),
                            t("Mei"),
                            t("Juni"),
                            t("Juli"),
                            t("Agustus"),
                            t("September"),
                            t("Oktober"),
                            t("November"),
                            t("Desember")
                        ];

                        const monthName = monthNames[month];

                        // console.log(day, monthName, year);

                        return `${day} ${monthName} ${year}`;
                    }}
                />
                <Column
                    body={(rowData) => {
                        console.log(rowData);
                        return "0";
                    }}
                    header="Motif Image"
                    // header={t("motifImage")}
                />
                <Column field="namaMotif" header={t("motifName")} />
                <Column field="namaPenerima" header={t("recieverName")} />
                <Column field="kontakPenerima" header={t("recieverContact")} />
                <Column field="jumlah" header={t("totalOrder")} />
                <Column
                    field="totalHarga"
                    header={t("totalPrice")}
                    body={(rowData) => {
                        return <span>{formatRupiah(rowData.totalHarga)}</span>;
                    }}
                />
                <Column
                    field="metodePengiriman"
                    header={t("sendMethod")}
                    body={(rowData) => {
                        return (
                            <span className="p-1 px-2 text-sm font-semibold text-blue-700 border border-blue-700 rounded-sm whitespace-nowrap">
                                {rowData.metodePengiriman}
                            </span>
                        );
                    }}
                />
                <Column field="alamat" header={t("address")} />
                <Column
                    body={(rowData) => {
                        return (
                            <button
                                onClick={(e) => {
                                    navigate("/invoice/" + rowData._id);
                                }}
                                className="p-2 m-2 text-sm text-white bg-blue-500 rounded-md whitespace-nowrap"
                            >
                                {t("viewDetails")}
                            </button>
                        );
                    }}
                    header={t("viewDetails")}
                />
            </DataTable>
        </Container>
    );
}

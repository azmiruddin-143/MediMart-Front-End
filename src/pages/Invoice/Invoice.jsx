import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import invoiceLogo from "../../assets/medicine-logo.png";
import { AuthContext } from "../../providers/AuthProvider";
import { FaChevronLeft } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const Invoice = () => {
    const { user } = useContext(AuthContext);
    const { transactionId } = useParams();
    const [invoiceData, setInvoiceData] = useState(null);
    const [base64Images, setBase64Images] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure
            .get(`/invoice/payment/${transactionId}`)
            .then((response) => {
                setInvoiceData(response.data);
                const imagePromises = response.data.image.map((url) => convertToBase64(url));
                Promise.all(imagePromises).then(setBase64Images);
            })
            .catch((error) => {
                console.error("Error loading invoice:", error);
            });
    }, [transactionId, axiosSecure]);

    const convertToBase64 = async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    };

    const handleDownloadPDF = () => {
        if (!invoiceData || base64Images.length === 0) {
            console.error("Invoice data or images not ready");
            return;
        }

        const doc = new jsPDF({ unit: "px", format: "a4" });

        // Logo and Header
        doc.addImage(invoiceLogo, "PNG", 20, 20, 50, 50);
        doc.setFontSize(20);
        doc.setFont("helvetica", "bold");
        doc.text("Invoice", 300, 40, { align: "center" });
        doc.setFontSize(12);
        doc.text("MediMart", 300, 60, { align: "center" });
        doc.text(`Date: ${new Date().toLocaleString()}`, 300, 80, { align: "center" });

        // Seller & Buyer Info
        let y = 100;
        doc.setFontSize(14);
        doc.text("Seller Information:", 20, y);
        doc.setFontSize(12);
        doc.text(`Website: MediMart`, 20, y + 20);
        doc.text(`Seller Email: ${invoiceData.sellerEmail[0] || "Email not available"}`, 20, y + 40);
        doc.text(`Office: Narayanganj`, 20, y + 60);

        doc.text("Buyer Information:", 300, y);
        doc.text(`Buyer Name: ${user?.displayName || "N/A"}`, 300, y + 20);
        doc.text(`Buyer Email: ${user?.email || "N/A"}`, 300, y + 40);
        doc.text(`Address: Comilla`, 300, y + 60);

        // Table Headers
        y += 100;
        doc.setFontSize(14);
        doc.text("Medicine Image", 20, y);
        doc.text("Medicine Name", 100, y);
        doc.text("Order Date", 250, y);
        doc.text("Price", 400, y);
        doc.line(20, y + 5, 480, y + 5);

        // Table Rows
        y += 20;
        invoiceData.name.forEach((name, index) => {
            doc.addImage(base64Images[index], "PNG", 20, y, 40, 40);
            doc.text(name, 100, y + 20);
            doc.text(new Date(invoiceData.date).toLocaleString(), 250, y + 20);
            doc.text(`${invoiceData.price}$`, 400, y + 20);
            y += 50;
        });

        // Total Price
        doc.setFontSize(14);
        doc.text(`Total Price: ${invoiceData.totalPrice}$`, 400, y + 20);

        doc.save("invoice.pdf");
    };

    if (!invoiceData) {
        return <LoadingSpinner />;
    }

    const dateFromMongoDB = invoiceData.date;
    const dateObject = new Date(dateFromMongoDB);

    const formattedDate = `${dateObject.getMonth() + 1}/${dateObject.getDate()}/${dateObject.getFullYear()}`;

    return (
        <div>
            <Helmet>
                <title>MediMart | Invoice </title>
            </Helmet>
            <Link to={'/'} ><h1 className='bg-primary text-black font-bold w-fit py-2 px-4 flex items-center gap-2 rounded-md my-3 mx-3'><FaChevronLeft /> Home Page</h1></Link>
            <div className="max-w-7xl px-10 mx-auto">
                <div className="flex justify-center mt-6">
                    <button
                        className="uppercase bg-primary py-2 px-5 text-black font-bold rounded-lg"
                        onClick={handleDownloadPDF}
                    >
                        Pdf Download
                    </button>
                </div>

                <div>
                    <div className="sm:flex my-14 justify-between items-center">
                        <img className="w-[150px] mb-8 sm:mb-0 bg-[#00000044] rounded-full" src={invoiceLogo} alt="" />
                        <div className="space-y-3 text-center">
                            <h1 className="text-5xl font-bold">Invoice</h1>
                            <h1>MediMArt</h1>
                            <p><strong>Date:</strong> {new Date(formattedDate).toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="sm:flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl mb-8 sm:mb-0 font-bold">BILL TO:</h1>
                            <p>Bangladesh Dhaka</p>
                            <p>123 Road</p>
                            <p>Malibag</p>
                        </div>
                        <div className="space-y-3">
                            <h1 className="text-2xl font-bold">Payment Information:</h1>
                            <p>Payment Name: Stripe</p>
                            <p>TransactionId: {invoiceData.transactionId}</p>
                            <p>Email: {invoiceData.email}</p>
                        </div>
                    </div>

                    <div className="overflow-x-auto mx-auto my-10">
                        <table className="table">
                            <thead>
                                <tr className="text-lg text-neutral">
                                    <th>Medicine Image</th>
                                    <th>Medicine Name</th>
                                    <th>Order Date</th>
                                    <th className="text-end">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoiceData.name.map((name, index) => (

                                    <tr key={index} className="text-neutral">
                                        <td>
                                            <div className="avatar flex gap-5">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img src={invoiceData.image[index]} alt={`Image ${index + 1}`} />
                                                </div>
                                            </div>
                                        </td>
                                        <td>{name}</td>
                                        <td>{formattedDate}</td>
                                        <td className="text-end">{invoiceData.price}$</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="my-14 sm:flex  justify-between items-end">
                            <div className="space-y-3 mb-8 sm:mb-0">
                                <h1 className="text-2xl font-bold">Seller Information:</h1>
                                <h1>Website: MediMart</h1>
                                <p>Seller Email: {invoiceData?.sellerEmail[0] || "Email not available"}</p>
                                <p>Office: Sonargoan Narayanganj</p>
                            </div>
                            <div className="space-y-3">
                                <h1 className="text-2xl font-bold">Buyer Information:</h1>
                                <h1>Buyer Name: {user?.displayName}</h1>
                                <p>Buyer Email: {user?.email}</p>
                                <p>Address: Comilla</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Invoice;

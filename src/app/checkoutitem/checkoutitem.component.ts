import { Component } from '@angular/core';
import { CartItem } from '../model/cart-tem';
import { CartService } from '../service/cart-service.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-checkoutitem',
  templateUrl: './checkoutitem.component.html',
  styleUrls: ['./checkoutitem.component.scss']
})
export class CheckoutitemComponent {
  cart: CartItem[] = [];
  address: string = '';
  cashOnDelivery: boolean = false;
  expectedDeliveryDate: Date | undefined;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cart = this.cartService.getCart();
    const currentDate = new Date();
    this.expectedDeliveryDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
  }

  getGrandTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  getCurrentDateTime(): string {
    const now = new Date();
    return now.toLocaleString();
  }
  getDiscount(): number {
    const total = this.getGrandTotal();
    return total > 3000 ? total * 0.10 : 0;
  }

  getTotalAfterDiscount(): number {
    return this.getGrandTotal() - this.getDiscount();
  }

  payNow() {
    if (!this.address) {
      alert('Please enter your delivery address!');
      return;
    }

    const confirmPayment = confirm('Do you want to proceed with payment?');
    if (!confirmPayment) return;

    if (this.cashOnDelivery) {
      alert('Order placed successfully! Cash on Delivery selected.');
    } else {
      alert('Redirecting to online payment gateway...');
    }
  }

  downloadInvoice() {
    const doc = new jsPDF();
    const logo = new Image();
    logo.src = 'assets/allspices.webp';

    logo.onload = () => {
      const logoX = 14, logoY = 10, logoSize = 25;

      doc.setDrawColor(0);
      doc.setFillColor(255, 255, 255);
      doc.circle(logoX + logoSize / 2, logoY + logoSize / 2, logoSize / 2, 'FD');
      doc.addImage(logo, 'PNG', logoX, logoY, logoSize, logoSize);

      // Title
      doc.setFontSize(18);
      doc.setTextColor(41, 128, 185);
      doc.text('Invoice For Mithila Spices & Pickles Store', 105, 25, { align: 'center' });

      // Date & Time
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text(`Date: ${this.getCurrentDateTime()}`, 150, 35, { align: 'left' });

      // Border
      doc.setDrawColor(0);
      doc.setLineWidth(0.5);
      doc.rect(10, 5, 190, 280);

      // Address & Payment with wrapping
      doc.setFontSize(12);
      let currentY = 50;
      const addressLines = doc.splitTextToSize(`Delivery Address: ${this.address}`, 180);
      doc.text(addressLines, 14, currentY);
      currentY += addressLines.length * 6;

      doc.text(`Payment: ${this.cashOnDelivery ? 'Cash on Delivery' : 'Online Payment'}`, 14, currentY + 6);
      currentY += 12;

      // Table Data
      const tableData: any[] = [];
      const promises: Promise<void>[] = [];

      this.cart.forEach(item => {
        const p = new Promise<void>((resolve) => {
          const img = new Image();
          img.src = item.img;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 40;
            canvas.height = 40;
            const ctx = canvas.getContext('2d')!;
            ctx.drawImage(img, 0, 0, 40, 40);
            const imgData = canvas.toDataURL('image/png');

            // Safely convert price to number
            const priceNum = Number(item.price) || 0;
            const totalNum = priceNum * (item.qty || 1);

            tableData.push([
              { content: '', styles: { cellWidth: 15, minCellHeight: 15, halign: 'center', valign: 'middle' }, image: imgData },
              item.name,
              (item.qty || 1) + ' ×',
              '\u20B9' + priceNum.toFixed(2),
              '\u20B9' + totalNum.toFixed(2)
            ]);
            resolve();
          };
        });
        promises.push(p);
      });

      Promise.all(promises).then(() => {
        autoTable(doc, {
          startY: currentY + 10,
          head: [['', 'Item', 'Qty', 'Price', 'Total']],
          body: tableData,
          theme: 'grid',
          headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' },
          styles: { fontSize: 11, cellPadding: 3, valign: 'middle' },
          didDrawCell: (data) => {
            if (data.column.index === 0 && (data.cell.raw as any).image) {
              const imgData = (data.cell.raw as any).image;
              doc.addImage(imgData, 'PNG', data.cell.x + 2, data.cell.y + 2, 12, 12);
            }
          }
        });

        const finalY = (doc as any).lastAutoTable.finalY || currentY + 10;

        const discount = this.getGrandTotal() > 3000 ? this.getGrandTotal() * 0.10 : 0;
        const totalAfterDiscount = this.getGrandTotal() - discount;

        if (discount > 0) {
          doc.setFontSize(12);
          doc.setTextColor(255, 0, 0); // red for visibility
          doc.text(`Discount:(10%): ₹${discount.toFixed(2)}`, 14, finalY + 10);
        }

        doc.setFontSize(14);
        doc.setTextColor(41, 128, 185);
        doc.text(`Grand Total: ₹${totalAfterDiscount.toFixed(2)}`, 14, finalY + 20);

        doc.save('invoice.pdf');
      });
    };
  }

}

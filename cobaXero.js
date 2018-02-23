const xero = require('xero-node');
const fs = require('fs');
const config = require('./newconfig.json');
 
//Private key can either be a path or a String so check both variables and make sure the path has been parsed.
if (config.privateKeyPath && !config.privateKey) 
    config.privateKey = fs.readFileSync(config.privateKeyPath);
 
// Available application types are:
// xero.PrivateApplication
// xero.PublicApplication
// xero.PartnerApplication
 
const xeroClient = new xero.PrivateApplication(config);
// console.log(config.userAgent);
xeroClient.core.invoices.getInvoices()
.then(invoices => {
	let emailBody="";
	let currentDate = new Date();
      for (var i = invoices.length - 1; i >= 0; i--) {
        let dueDate = new Date(invoices[i].DueDateString);
        let dueRemaining = dueDate - currentDate;
        // &&(dueRemaining < 604800000)&&(dueRemaining >= 0)
        // if((invoices[i].Type == "ACCREC") &&(invoices[i].Status == "AUTHORISED")){
        // if((invoices[i].Type == "ACCREC") &&(invoices[i].Status == "AUTHORISED")){
          //emailBody += "<td style='border: 1px solid #dddddd; padding:8px;'>"+invoices[i].InvoiceNumber+"</td><td style='border: 1px solid #dddddd; padding:8px;'>"+invoices[i].Contact.Name+"</td><td style='border: 1px solid #dddddd; padding:8px;'>"+invoices[i].AmountDue+"</td><td style='border: 1px solid #dddddd; padding:8px;'>"+invoices[i].DueDateString+"</td></tr>";
        	emailBody = invoices[i].Contact.Name +" "+invoices[i].AmountDue+" "+dueRemaining+" "+invoices[i].DueDateString+" "+invoices[i].Status+" "+invoices[i].Type;
      		console.log(emailBody);
        // }
      }
      console.log("\n");
      for (var i = invoices.length - 1; i >= 0; i--) {
        let dueDate = new Date(invoices[i].DueDateString);
        let dueRemaining = dueDate - currentDate;
        // &&(dueRemaining < 604800000)&&(dueRemaining >= 0)
        if((invoices[i].Type == "ACCREC") &&(invoices[i].Status == "AUTHORISED")){
        // if((invoices[i].Type == "ACCREC") &&(invoices[i].Status == "AUTHORISED")){
          //emailBody += "<td style='border: 1px solid #dddddd; padding:8px;'>"+invoices[i].InvoiceNumber+"</td><td style='border: 1px solid #dddddd; padding:8px;'>"+invoices[i].Contact.Name+"</td><td style='border: 1px solid #dddddd; padding:8px;'>"+invoices[i].AmountDue+"</td><td style='border: 1px solid #dddddd; padding:8px;'>"+invoices[i].DueDateString+"</td></tr>";
        	emailBody = invoices[i].Contact.Name +" "+invoices[i].AmountDue+" "+dueRemaining+" "+invoices[i].DueDateString+" "+invoices[i].Status+" "+invoices[i].Type;
      		console.log(emailBody);
        }
      }
      
      console.log("\n");
      for (var i = invoices.length - 1; i >= 0; i--) {
        let dueDate = new Date(invoices[i].DueDateString);
        let dueRemaining = dueDate - currentDate;
        // &&(dueRemaining < 604800000)&&(dueRemaining >= 0)
        if((invoices[i].Type == "ACCREC") &&(invoices[i].Status == "AUTHORISED")&&(dueRemaining < 604800000)&&(dueRemaining >= 0)){
        // if((invoices[i].Type == "ACCREC") &&(invoices[i].Status == "AUTHORISED")){
          //emailBody += "<td style='border: 1px solid #dddddd; padding:8px;'>"+invoices[i].InvoiceNumber+"</td><td style='border: 1px solid #dddddd; padding:8px;'>"+invoices[i].Contact.Name+"</td><td style='border: 1px solid #dddddd; padding:8px;'>"+invoices[i].AmountDue+"</td><td style='border: 1px solid #dddddd; padding:8px;'>"+invoices[i].DueDateString+"</td></tr>";
        	emailBody = invoices[i].Contact.Name +" "+invoices[i].AmountDue+" "+dueRemaining+" "+invoices[i].DueDateString+" "+invoices[i].Status+" "+invoices[i].Type;
      		console.log(emailBody);
        }
      }
}).catch(err => {
    console.log(err);
});
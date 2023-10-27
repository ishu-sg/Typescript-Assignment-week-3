// import 'module-alias/register';
// import logger from '@core/logger';
// import { getConnectionManager, getManager, IsNull } from 'typeorm';
// import constant from '@config/constant';
// import { PaymentRunSitesRepo } from '@database/repository/payment-run-sites.repository';
// import { Kernel } from '@core/kernel';
// import { DocumentGeneration } from '@service/document.service';
// export class CreatePaymentRunDocs {
//   constructor() {
//     this.initCron();
//   }
//   public async initCron(): Promise<number> {
//     try {
//       logger.info({
//         eventCode: 'PWB-FINANCE-CRON-CREATE-PAYMENT-RUN-DOCS-MF-001',
//         msg: 'Started Cron to create payment run statement and invoices',
//         data: { date: new Date() },
//       });
//       // check if a connection exists
//       const hasConnection = getConnectionManager().has('default');
//       if (!hasConnection) {
//         await new Kernel().databaseConnection();
//       }
//       // cron will act as an individual job so creating a new database instance
//       const documentGeneration = new DocumentGeneration();
//       const paymentRunSiteIds = await getManager()
//         .getCustomRepository(PaymentRunSitesRepo)
//         .find({
//           where: [
//             { invoiceDocument: IsNull() },
//             { statementDocument: IsNull() },
//             { transactionDocument: IsNull() },
//             { refundDocument: IsNull() },
//             { supplychainDocument: IsNull() },
//           ],
//           take: constant.CRON_DOCS_NUMBER_AT_ONCE,
//         });
//       logger.info({
//         eventCode: 'PWB-FINANCE-CRON-CREATE-PAYMENT-RUN-DOCS-MF-002',
//         msg: 'PaymentRunSites having no invoice and statement docs',
//         data: { paymentRunSiteIds },
//       });
//       const requestId = `CRON-JOB-${new Date()}`;
//       for (const siteId of paymentRunSiteIds) {
//         await documentGeneration.generateAllDocuments(
//           siteId?.paymentRunSiteId,
//           constant?.USER_ADMIN_ID,
//           requestId
//         );
//       }
//       logger.info({
//         eventCode: 'PWB-FINANCE-CRON-CREATE-PAYMENT-RUN-DOCS-MF-004',
//         msg: 'Cron executed and completed',
//         data: {},
//       });
//       await new Kernel().closeDatabaseConnection();
//       logger.info({
//         eventCode: 'PWB-FINANCE-CRON-CREATE-PAYMENT-RUN-DOCS-MF-005',
//         msg: 'Connection closed',
//         data: {},
//       });
//       process.exit(0);
//     } catch (err) {
//       await new Kernel().closeDatabaseConnection();
//       logger.info({
//         eventCode: 'PWB-FINANCE-CRON-CREATE-PAYMENT-RUN-DOCS-MF-005',
//         msg: 'CONNECTION CLOSED',
//         data: err,
//       });
//       logger.error(
//         '========= error in cron to create payment run statement and invoice docs =======',
//         err
//       );
//       process.exit(1);
//     }
//   }
// }
// export default new CreatePaymentRunDocs();
//# sourceMappingURL=orderupdate.cron.js.map
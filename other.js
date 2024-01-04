import nodemailer from "nodemailer";

export const sendEmail = async (email, subject, dynamicContent) => {
  try {
    // Construct the HTML content dynamically
    const htmlContent = `
      <html>
        <body>
          <h1>${subject}</h1>
          <p>${dynamicContent}</p>
          <p>This is an example of dynamically added content in the email.</p>
        </body>
      </html>
    `;

    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      html: htmlContent,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
//  filter api
export const getGigs = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
    $or: [
      { title: { $regex: q.search, $options: "i" } },
      { description: { $regex: q.search, $options: "i" } },
    ],
  };
  try {
    const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });
    res.status(200).send(gigs);
  } catch (err) {
    next(err);
  }
};

export const getGigss = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
  };

  if (q.search) {
    filters.$or = [
      { title: { $regex: q.search, $options: "i" } },
      { description: { $regex: q.search, $options: "i" } },
    ];
  }

  try {
    const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });
    res.status(200).send(gigs);
  } catch (err) {
    next(err);
  }
};

// if (q.search) {
//   filters.$or = [
//     { title: { $regex: q.search, $options: "i" } },
//     { description: { $regex: q.search, $options: "i" } },
//     { location: { $regex: q.search, $options: "i" } },
//   ];
// }

if (query) {
  const regexQuery = query.split(" ").join(".*");
  filter.$or = [
    { location: { $regex: regexQuery, $options: "i" } },
    { title: { $regex: regexQuery, $options: "i" } },
    { description: { $regex: regexQuery, $options: "i" } },
  ];
}

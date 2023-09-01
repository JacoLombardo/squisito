import Image from "next/image";
import React from "react";

function Footer() {
  return (
    <>
      <footer className="text-center text-lg-start bg-light text-muted">
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <Image
                    alt={`Jacopo's Github`}
                    title={`Jacopo's Github`}
                    src={`/Images/Navbar/logo1.png`}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "80px", height: "auto" }}
                  />
                </h6>
                <p>Fake shop of high class kitchen appliances.</p>
              </div>
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Social networks</h6>
                <p>
                  <a
                    href="https://github.com/JacoLombardo"
                    target="_blank"
                    className="me-4 text-reset"
                  >
                    <Image
                      alt={`Jacopo's Github`}
                      title={`Jacopo's Github`}
                      src={`/Images/Icons/github.png`}
                      width={25}
                      height={25}
                    />
                  </a>
                  Jacopo
                </p>
                <p>
                  <a
                    href="https://github.com/julischa"
                    target="_blank"
                    className="me-4 text-reset"
                  >
                    <Image
                      alt={`Juliane's Github`}
                      title={`Juliane's Github`}
                      src={`/Images/Icons/github.png`}
                      width={25}
                      height={25}
                    />
                  </a>
                  Juliane
                </p>
              </div>
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <a href="mailto:jacopo.lombardo@outlook.com">
                    jacopo.lombardo@outlook.com
                  </a>
                </p>
                <a href="mailto:julianeschawert@gmail.com">
                  julianeschawert@gmail.com
                </a>
              </div>
            </div>
          </div>
        </section>
        <div
          className="text-center p-4"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.05)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          © 2023 Copyright:{" "}
          <p style={{ fontWeight: "bold" }}>
            &nbsp; Jacopo Lombardo & Juliane Schawert
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;

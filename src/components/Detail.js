/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from "react";
import { Row, Col, Tabs, Button } from "antd";
import backendService from "../api/BackendService";
import { Link, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

const Detail = () => {
  const [details, setDetails] = useState({});
  const [episode, setEpisode] = useState({});
  const [epurl, setEpurl] = useState("");
  const [array, setArray] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    backendService
      .getCharacterDetail(id)
      .then((res) => {
        setDetails(res.data);
        setEpurl(res.data.episode[0]);
        setArray(res.data.episode);
      })
      .catch((err) => console.log(err));
  }, [id]);
  useEffect(() => {
    details &&
      backendService
        .getEpisodeInfo(epurl)
        .then((res) => setEpisode(res.data))
        .catch((err) => console.log(err));
  }, [details, epurl]);

  return (
    <>
      <div style={{ marginTop: "100px", marginLeft: "30px" }}>
        <Row><Link to='/characters' style={{marginBottom:"20px"}}><Button icon={<ArrowLeftOutlined/>}>Back</Button></Link></Row>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={10} key="1">
            <img
              alt="character detail"
              src={details.image}
              style={{ border: "solid", padding: "10px" }}
            />
          </Col>
          <Col xs={24} sm={18} md={14} key="2">
            <div style={{ margin: "20px", fontSize: "1.5rem" }}>
              {details.id && (
                <div>
                  <b>ID:</b> {details.id}
                </div>
              )}
              {details.name && (
                <div>
                  <b>Name:</b> {details.name}
                </div>
              )}
              {details.status && (
                <div>
                  <b>Status:</b> {details.status}
                </div>
              )}
              {details.species && (
                <div>
                  <b>Species:</b> {details.species}
                </div>
              )}
              {details.type && (
                <div>
                  <b>Type:</b> {details.type}
                </div>
              )}
              {details.gender && (
                <div>
                  <b>Gender:</b> {details.gender}
                </div>
              )}
              {details.origin && (
                <div>
                  <b>Origin:</b> {details.origin.name}
                </div>
              )}
              {details.created && (
                <div>
                  <b>Created:</b> {details.created}
                </div>
              )}
            </div>
          </Col>
          <Col>
            <div style={{ fontSize: "1.8rem", marginTop: "30px" }}>
              Episode Information
            </div>
            <br />
            {episode && (
              <Tabs
                type="card"
                style={{ fontSize: "1.3rem", marginBottom: "30px" }}
                onChange={(key) => {
                  setEpurl(details.episode[key]);
                }}
              >
                {[
                  ...Array.from(
                    {
                      length: array.length >= 5 ? 5 : array.length,
                    },
                    (_, i) => i
                  ),
                ].map((i) => (
                  <TabPane tab={"EP " + (i + 1)} key={i}>
                    {episode.id && (
                      <div>
                        <b>Episode ID:</b> {episode.id}
                      </div>
                    )}
                    {episode.name && (
                      <div>
                        <b>Episode Name:</b> {episode.name}
                      </div>
                    )}
                    {episode.air_date && (
                      <div>
                        <b>Episode AIR date:</b> {episode.air_date}
                      </div>
                    )}
                    {episode.episode && (
                      <div>
                        <b>Episode:</b> {episode.episode}
                      </div>
                    )}
                  </TabPane>
                ))}
              </Tabs>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Detail;

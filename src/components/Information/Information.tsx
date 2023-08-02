import { Box, Typography } from "@mui/material";
import "./style.css"

export function Information() {
    return (
        <Box>
            <div className="text-wrapper">
                <Typography variant="h4" gutterBottom>
                    1. BẠN HIỂU GÌ VỀ SIM SỐ ĐẸP?
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Sim số đẹp</strong> là 1 tên gọi chung cho các dòng sim nghe gọi chứa những đuôi số có định dạng như các con số giống nhau (bát quý, thất quý, lục quý, ngũ quý, tứ quý, tam quý), các con số tiến, các cụm số lặp, kép, đảo hay các cụm số độc (các đuôi số có ý nghĩa độc, hay mốc sự kiện đặc biệt) và có thể là đuôi số may mắn theo quan niệm dân gian như thần tài (39, 79), lộc phát (68, 86), ông địa (38, 78)...

                    Để hiểu hơn về các dòng sim số đẹp hãy đọc tiếp phần 2 nhé.
                </Typography>
            </div>
            <div className="text-wrapper">
                <Typography variant="h4" gutterBottom>
                    2. SIM SỐ ĐẸP GỒM NHỮNG GÌ?
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Như đã nhắc ở trên, sim số đẹp là các số sim có định dạng, và các định dạng hay các loại sim gồm các dòng sau:
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <br />
                    <strong>Sim bát quý</strong>: có thể nói đây là dòng sim số đẹp vip nhất trong các dòng sim với 8 số đuôi giống nhau (VD: 88888888, 99999999), trên thị trường sim bát quý đang lưu hành chỉ đếm trên đầu ngón tay
                    <br />
                    <strong>Sim thất quý</strong>: với 7 con số đuôi giống nhau (VD: 8888888, 9999999), sim thất quý không kém cạnh nhiều so với bát quý và cũng vì thế mà độ khan hiếm của nó cũng rất cao
                    <br />
                    <strong>Sim lục quý</strong>: với 6 con số đuôi giống nhau nên cũng vì thế mà độ khan hiếm cũng không quá lớn (VD: 888888, 999999), tại simdepmobifone.com.vn chỉ có gần 100 số sim được rao bán với mức giá từ gần 200 triệu đến gần 10 tỷ đồng
                    <br />
                    <strong>Sim ngũ quý</strong>: dòng sim số đẹp với 5 con số đuôi giống nhau (VD: 88888, 99999), đang có gần 400 số tại simdepmobifone.com.vn với mức giá giao động từ 25 triệu đến hơn 5 tỷ đồng
                    <br />
                    <strong>Sim tứ quý</strong>: Là sim số đẹp dòng quý có sức hút hơn hẳn các "đàn anh" của mình cũng bởi vì nhu cầu về độ đẹp cũng là quá đủ với mức giá cũng mềm hơn rất nhiều (VD: 8888, 9999), tại simdepmobifone.com.vn sim tứ quý có giá từ 4 triệu đến gần 4 tỷ đồng
                    <br />
                    <strong>Sim tam quý</strong>: hay còn gọi là sim tam hoa, là 1 dòng sim số đẹp bình dân mà cũng có sức hút khá tốt (VD: 333, 999), tại simdepmobifone.com.vn giá từ 300 ngàn đến vài trăm triệu đồng
                    <br />
                    <strong>Sim tam quý kép</strong>: hay còn gọi là tam hoa kép, là sim số đẹp có chứa 6 số cuối là 2 cụm tam hoa khác nhau (VD: 888999, 222555), loại sim này có giá từ 5 triệu đến 4 tỷ đồng
                    <br />
                    <strong>Sim taxi</strong>: dòng sim đẹp này thường được các doanh nghiệp chọn làm hotline vì độ dễ nhớ cao, có các loại sim taxi 4, 3, 2 hay taxi dù (VD: 232323, 099099), Sim taxi có giá 500 ngàn cho đến 5 tỷ đồng
                    <br />
                    <strong>Sim số tiến</strong>: là dòng sim số đẹp với tối thiểu 3 số cuối tiến theo 1 quy tắc hoặc theo thứ tự +1 (VD: 3456, 2468, 23456789), dòng sim này có giá từ 200 ngàn đến hơn 10 tỷ
                    <br />
                    <strong>Sim lộc phát, thần tài, ông địa</strong>: là dòng sim số đẹp có đuôi số chứa cặp 68, 86, 39, 79, 38, 78 vậy nên hoàn toàn những số sim này có thể thuộc các dòng sim khác. Các dòng sim này có giá từ dưới 500 ngàn đến 500 triệu đồng.
                    <br />
                    <strong>Sim Lặp kép</strong>: là dòng sim số đẹp kết hợp của 2 loại sim kép và sim lặp (VD: 6688, 8989), dòng sim này có giá dưới 500 ngàn đến 500 triệu đồng
                    <br />
                    <strong>Sim Gánh đảo</strong>: là sim số đẹp chứa các cụm số đuôi gánh hoặc đảo nhau (VD: 890098, 8998), dòng sim này có giá từ dưới 500 ngàn đến 400 triệu đồng.
                    <br />
                    <strong>Sim Đôi</strong>: hay còn gọi là sim cặp hoặc sim tình nhân với các cặp số sim chỉ khác nhau 1 vài số trên sim, sim tình nhân có giá từ dưới 500 ngàn đến dưới 50 triệu đồng
                    <br />
                    <strong>Sim Năm sinh</strong>: là dòng sim số đẹp với đuôi số chứa các cụm tương ứng với các ngày tháng năm sinh, có các dòng sim năm sinh 4 số, 6 số và 8 số (VD: 03021988, 3288, 030288). Sim năm sinh có giá từ dưới 500 ngàn đến 50 triệu đồng
                    <br />
                    <strong>Sim Số độc</strong>: là dòng sim chứa các đuôi số là các mang ý nghĩa độc đáo (VD: 1102: độc nhất vô nhị), các cụm số gắn liền với các sự kiện đặc biệt (VD: 051423: 3 ngày xấu nhất trong tháng)...Dòng sim độc này có giá từ dưới 500 ngàn đến vài chục triệu)
                    <br />
                    <strong>Sim Lục quý giữa, Sim Ngũ quý giữa, Sim Tứ quý giữa</strong>: Tương tự như sim lục quý, ngũ quý và tam quý nhưng khác là các cụm số này ở cuối số sim, loại sim này có giá từ dưới 500 ngàn đến vài chục triệu đồng
                    <br />
                    <strong>Sim đầu số cổ</strong>: là dòng sim có chứa các đầu số cổ của các nhà mạng, các đầu số ra đời từ những ngày đầu nhà mạng bắt đầu kinh doanh
                    <br />
                    <strong>Sim phong thủy</strong>: là dòng sim hợp tuổi, hợp mệnh với từng người, sim phong thủy có thể là 1 trong số các dạng sim ở trên nên cũng vì thế mà khoảng giá từ vài trăm nghìn cho đến cả tỷ đồng
                </Typography>
            </div>
            <div className="text-wrapper">
                <Typography variant="h4" gutterBottom>
                    3. LỜI KHUYÊN KHI CHỌN SIM:
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Chọn mua sim theo ngân sách:
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Mua sim ngân sách dưới 500.000đ</strong>: Với ngân sách dưới 500 ngàn tại simdepmobifone.com.vn bạn đã có thể chọn cho mình sim tam hoa 0, 1, 2, 3, 4 hay sim lặp kép, gánh đảo, tiến lên 0123, tứ quý giữa của 3 nhà mạng chính, hãy tham khảo danh mục sim dưới 500k để kiểm chứng "sắc đẹp" của nó nhé.
                    <br />
                    <strong>Mua sim ngân sách từ 500.000đ - 1 triệu</strong>: Với ngân sách này bạn cũng sẽ có cho mình những số sim mang chủng loại và đuôi số như sim dưới 500k nhưng đầu số và các con số ở giữa sẽ "Chất" hơn đấy
                    <br />
                    <strong>Mua sim ngân sách từ 1 triệu - 3 triệu</strong>: Ở mức ngân sách này bạn đã có thể thoải mái hơn khi có thêm nhiều sự lựa chọn về các đầu số cổ, đuôi số cũng sẽ lớn hơn, đẹp hơn như tam hoa kép 888999 giữa, tứ 6, 8, 9 giữa, tiến lên 1234, 2345
                    <br />
                    <strong>Mua sim ngân sách từ 3 triệu - 5 triệu</strong>: Với ngân sách này bạn đã có quyền yêu cầu 1 số sim chỉ chứa các con số đẹp nhất đó là 6 8 9, hay sim tam hoa 5 6 7 8 9, sim lộc phát 6668 8686...
                    <br />
                    <strong>Mua sim ngân sách từ 5 triệu - 10 triệu</strong>: Với mức ngân sách này bạn có thể chọn bất cứ 1 dòng sim gì mình thích trừ sim ngũ quý trở lên, tức là bạn có thể chọn sim tứ quý, tam hoa, taxi, lộc phát, thần tài với dạng số bạn thích
                    <br />
                    <strong>Mua sim ngân sách từ 10 triệu - 50 triệu</strong>: Bạn có thể đưa ra nhiều tiêu chí khắt khe hơn cho các dòng sim mà ngân sách 10 triệu đã liệt kê như tránh các con số bạn không thích, đầu số phải cổ...và ĐỪNG QUÊN ngân sách này có thể mua được sim ngũ quý 0 1 4 7 rồi nhé
                    <br />
                    <strong>Mua sim ngân sách từ 50 triệu - 100 triệu</strong>: Lại là 1 mức cao hơn mức tối đa 50 triệu, tức là với mức này bạn có thể chọn được các đuôi số ngũ quý đẹp hơn như 2 3 5 6, và bất kỳ đuôi tứ quý, tam hoa, hay các dòng thấp hơn
                    <br />
                    <strong>Mua sim ngân sách từ 100 triệu - 200 triệu</strong>: Bạn muốn mua sim lục quý thì có thể cân nhắc đến lục quý 0 1 4, ngũ quý có thể tự tin chọn đến tận ngũ quý 9, hay các dòng sim số đẹp khác với đầy đủ các tiêu chí khắt khe nhất bạn đưa ra
                    <br />
                    <strong>Mua sim ngân sách từ 200 triệu - 500 triệu</strong>: Với ngân sách 500 triệu để chọn thoải mái 1 sim lục quý thì cũng chưa đâu nhé, bạn có thể chọn lục quý 0 1 2 3 4 5 7, còn lục quý 6 8 9 có giá trên 500 triệu
                    Mua sim ngân sách trên 500 triệu: Từ 500tr trở lên đến 1 tỷ bạn có thể mua được các loại sim lục quý đổ xuống trừ lục quý 8 và 9 nhé, còn trên 1 tỷ thì bạn "Tẹt Ga" đi, sim nào bạn cũng có thể ngả giá nhé
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Chọn mua sim số đẹp khuyến mại nghe gọi, 4G:
                </Typography>
                <Box sx={{ paddingLeft: "50px" }}>
                    <Typography variant="body1" gutterBottom>
                        Nếu yêu cầu sở hữu 1 số sim đẹp không phải là duy nhất khi bạn chọn mua sim mà còn các dịch vụ đi theo số sim đó như số phút nghe gọi miễn phí, dung lượng 4G thì bạn hãy yêu cầu nhân viên tư vấn sim trả sau cho mình nhé
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        yeusimsodep.com thấy nhiều khách hàng đến với mình lo sợ về sim trả sau về vấn đề trừ tiền không chính xác, nhưng vấn đề này đã được các nhà mạng khắc phục bằng việc bạn có thể tự kiểm soát chi tiêu trên app
                    </Typography>
                </Box>
                <Typography variant="body1" gutterBottom>
                    Còn nói đến <strong>LỢI ÍCH</strong> khi dùng sim trả sau thì rõ ràng:
                    <br />
                    Giá sim rẻ hơn cả 5 - 10 lần với sim trả trước
                    <br />
                    Chi phí 1 tháng rẻ chỉ bằng 1/2 khi bạn dùng sim trả trước, vì ở đây có thể chỉ với trên dưới 100.000đ mà bạn đã có cho mình combo gọi điện, sử dụng 4G thả ga
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Chọn mua sim làm ăn:
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Nếu bạn là 1 doanh nghiệp lớn, cần ghi dấu ấn với khách hàng và đối tác thì simdepmobifone.com.vn khuyên bạn đầu tư 1 số sim taxi 2 3 hay sim tứ quý 6 8 9 trở lên. Nếu chi phí lớn bạn có thể trả góp với mức phí thấp như bạn mua điện máy ở siêu thị
                    <br />
                    Nếu bạn là 1 doanh nghiệp bình thường, việc hình ảnh từ hotline không quá quan trọng thì hãy tùy thuộc vào khả năng của doanh nghiệp để chọn 1 số sim theo mức ngân sách bạn có thể bỏ ra, hãy đọc phần 3: "Lời khuyên khi chọn sim" nhé
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Chọn mua sim phong thủy:
                </Typography>
                <Box sx={{ paddingLeft: "50px" }}>
                    <Typography variant="body1" gutterBottom>
                        Sim phong thủy trên thị trường Việt Nam đang bị pha tạp rất nhiều, nếu thực sự muốn chọn 1 số sim hợp tuổi mình thì hãy chọn thầy uy tín, chọn sim dựa vào giờ ngày tháng năm sinh và nghe tư vấn thêm các vấn đề khác mình đang gặp phải và có 1 quy trình tổng thể để cân bằng lại những điểm khuyết của mình
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Bạn có thể tham khảo về sim phong thủy hợp với mình thông qua link này: Sim phong thủy
                    </Typography>
                </Box>
            </div>
            <div className="text-wrapper">
                <Typography variant="h4" gutterBottom>
                    4. TẠI SAO NÊN MUA SIM TẠI yeusimsodep.com ?
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Nhắc đến simdepmobifone.com.vn chắc hẳn nhiều người cũng đã từng nghe qua hay thấy ở đâu đó trên internet, vậy có điều gì khác biệt với các website sim số đẹp khác để bạn nên mua sim tại đây:
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Giá tốt nhất thị trường</strong>: nhắc đến giá sim trên yeusimsodep.com chúng tôi tự tin là 1 website có giá rẻ hơn các web khác lên đến 90% số lượng sim bởi:
                    <br />
                    yesimsodep.com là đại lý cấp 1 tại 3 nhà mạng Viettel, Vinaphone, Mobifone từ 5 năm nay
                    <br />
                    Với hơn 50.000 người ghé thăm mỗi ngày, yeusimsodep.com luôn có được chính sách giá tốt từ các nhà cung cấp
                    <br />
                    Hệ sinh thái lớn của nhiều ngành nghề dẫn đến tiết kiệm tối đa chi phí từ nhập sim về đến khi tới tay khách hàng
                    <br />
                    <strong>Hệ thống cửa hàng yesimsodep.com</strong> cộng với cửa hàng nhà mạng tại hơn 20 tỉnh giúp hỗ trợ chăm sóc khách hàng tốt nhất, đáng tin cậy nhất
                    <br />
                    <strong>
                        Chính sách trước và sau bán hàng tốt nhất:
                    </strong>
                    <br />
                    yeusimsodep.com luôn tư vấn hỗ trợ khách hàng tìm được số sim phù hợp nhu cầu sở hữu và nhu cầu sử dụng với chi phí tiết kiệm nhất
                    <br />
                    Hỗ trợ vào tên chính chủ, giao sim miễn phí tại nhà, kiểm tra đúng thông tin mới phải trả tiền
                    <br />
                    Chính sách giao sim nhanh gọn, nhanh nhất chỉ trong 2 tiếng
                    <br />
                    Thay mặt nhà mạng hỗ trợ các vấn đề phát sinh trong quá trình sử dụng
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Bạn còn băn khoăn gì hãy CHAT hoặc GỌI NGAY cho simdepmobifone.com.vn, chúng tôi sẽ hỗ trợ bạn tất cả các vấn đề liên quan không chỉ là mua bán sim số đẹp.
                </Typography>
            </div>
        </Box>
    )
}